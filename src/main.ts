import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bodyParser: false,
    logger: new ConsoleLogger({
      logLevels: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
      prefix: 'HELPDESK',
      timestamp: true,
      colors: true,
      json: false
    })
  });

  app.set('trust proxy', true);

  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: false }));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'http:', 'https:'],
          scriptSrc: ["'self'", 'http:', 'https:', "'unsafe-inline'"],
          styleSrc: ["'self'", 'http:', 'https:', "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
          manifestSrc: ["'self'", 'apollo-server-landing-page.cdn.apollographql.com']
        }
      }
    })
  );

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    credentials: true,
    methods: 'POST,OPTIONS'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      stopAtFirstError: true
    })
  );

  const port = configService.getOrThrow<number>('PORT');
  const host = configService.getOrThrow<string>('HOST');

  await app.listen(port, host, () => {
    void (async () => {
      const url = await app.getUrl();
      console.info(`Application is running on: ${url}`);
    })();
  });
}

bootstrap().catch(err => {
  console.error('Failed to application', err);
  process.exit(1);
});
