import { DynamicModule, Global, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as handlebars from 'nodemailer-express-handlebars';
import { join } from 'path';

import { MailerService } from './mailer.service';

@Global()
@Module({})
export class MailerModule {
  static forRootAsync(options: {
    useFactory: (
      ...args: Record<string, any>[]
    ) => Promise<Record<string, any>> | Record<string, any>;
    imports?: any[];
    inject?: any[];
  }): DynamicModule {
    return {
      module: MailerModule,
      imports: options.imports,
      providers: [
        {
          provide: 'MAILER',
          useFactory: async (...args: Record<string, any>[]) => {
            const { host, port, auth, sender } = await options.useFactory(...args);
            const transporter = createTransport(
              {
                host: host,
                port: port,
                secure: port === 465 ? true : false,
                auth: {
                  user: auth.user,
                  pass: auth.pass
                },
                tls: {
                  rejectUnauthorized: false
                }
              },
              { from: `"Helpdesk Service" <${sender}>` }
            );

            transporter.use(
              'compile',
              handlebars({
                viewEngine: {
                  extname: '.hbs',
                  layoutsDir: join(__dirname, 'templates', 'layouts'),
                  defaultLayout: 'main',
                  partialsDir: join(__dirname, 'templates', 'partials')
                },
                viewPath: join(__dirname, 'templates'),
                extName: '.hbs'
              })
            );

            transporter.verify((err, success) => {
              if (err) {
                console.error(err);
              }
            });

            return transporter;
          },
          inject: options.inject || []
        },
        MailerService
      ],
      exports: ['MAILER', MailerService]
    };
  }
}
