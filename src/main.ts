import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const SWAGGER_API_TITLE = 'API Helpdesk';
const SWAGGER_API_DESCRIPTION = 'The Helpdesk API documentation';
const SWAGGER_API_VERSION = '1.0';
const SWAGGER_API_PATH = '/';

const GLOBAL_PREFIX = '/api/v1';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bodyParser: false,
    logger: ['log', 'error', 'warn']
  });

  const configService = app.get(ConfigService);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: false }));

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
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

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_API_TITLE)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT Guard',
        description: 'Enter JWT Bearer token',
        in: 'header'
      },
      'JWT Guard'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_PATH, app, document, {
    explorer: false,
    customCss: fs.readFileSync('src/common/themes/dark.css', 'utf8'),
    customSiteTitle: 'API Helpdesk | Swagger'
  });

  const port = configService.get('port');
  const host = configService.get('host');

  await app.listen(port, host, async () => {
    console.info(`Application is running on: ${await app.getUrl()}/`);
  });
}
bootstrap();
