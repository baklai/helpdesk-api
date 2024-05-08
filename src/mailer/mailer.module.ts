import { DynamicModule, Global, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';

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
            const { host, port, auth } = await options.useFactory(...args);
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
              { from: `"Helpdesk Service" <${auth.user}>` }
            );

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
