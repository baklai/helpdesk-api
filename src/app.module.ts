import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { join } from 'path';
import { existsSync } from 'fs';
import * as mongooseAutopopulate from 'mongoose-autopopulate';
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
import * as mongoosePaginate from 'mongoose-paginate-v2';

import appConfig from './config/app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { EventsModule } from './events/events.module';
import { NetmapsModule } from './netmaps/netmaps.module';
import { ChannelsModule } from './channels/channels.module';
import { MailboxesModule } from './mailboxes/mailboxes.module';
import { IpaddressesModule } from './ipaddresses/ipaddresses.module';
import { InspectorsModule } from './inspectors/inspectors.module';
import { PingsModule } from './pings/pings.module';
import { RequestsModule } from './requests/requests.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { SubdivisionsModule } from './subdivisions/subdivisions.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { UnitsModule } from './units/units.module';
import { LocationsModule } from './locations/locations.module';
import { FiltersModule } from './filters/filters.module';
import { NoticesModule } from './notices/notices.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ReportsModule } from './reports/reports.module';
import { SystoolsModule } from './systools/systools.module';
import { SyslogsModule } from './syslogs/syslogs.module';
import { StorageModule } from './storage/storage.module';
import { MailerModule } from './mailer/mailer.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

function createStaticModule(directory: string, serveRoot: string, exclude = ['/api/(.*)']) {
  if (!directory || !serveRoot) return [];

  const filePath = join(__dirname, '..', directory, 'index.html');

  return existsSync(filePath)
    ? [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', directory),
          serveRoot,
          exclude
        })
      ]
    : [];
}

const AppStaticModule = createStaticModule('app', '', ['/api/(.*)']);
const DocsStaticModule = createStaticModule('docs', '/docs', ['/api/(.*)']);

const mailerTemplatesPath = join(__dirname, 'mailer');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig]
    }),

    ...AppStaticModule,
    ...DocsStaticModule,

    ScheduleModule.forRoot(),

    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('SMTP_HOST'),
        port: configService.get<string>('SMTP_PORT'),
        templates: mailerTemplatesPath,
        auth: {
          user: configService.get<string>('SMTP_USERNAME'),
          pass: configService.get<string>('SMTP_PASSWORD')
        },
        sender: configService.get<string>('SMTP_SENDER')
      })
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: connection => {
          connection.plugin((schema: Schema) => {
            schema.set('autoCreate', false);
            schema.set('versionKey', false);
            schema.set('timestamps', true);
            schema.virtual('id').get(function () {
              return this._id;
            });
            schema.set('toJSON', {
              virtuals: true,
              transform: function (doc, ret) {
                delete ret._id;
              }
            });
            schema.set('toObject', {
              virtuals: true,
              transform: function (doc, ret) {
                delete ret._id;
              }
            });
          });
          connection.plugin(mongooseAutopopulate);
          connection.plugin(mongooseAggregatePaginate);
          connection.plugin(mongoosePaginate);

          return connection;
        }
      })
    }),

    AuthModule,
    ProfilesModule,
    EventsModule,
    ChannelsModule,
    IpaddressesModule,
    MailboxesModule,
    RequestsModule,
    NetmapsModule,
    InspectorsModule,
    PingsModule,
    NoticesModule,
    OrganizationsModule,
    SubdivisionsModule,
    DepartmentsModule,
    PositionsModule,
    LocationsModule,
    UnitsModule,
    FiltersModule,
    StatisticsModule,
    ReportsModule,
    SystoolsModule,
    SyslogsModule,
    StorageModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/notices', method: RequestMethod.GET },
        { path: '/syslogs', method: RequestMethod.GET },
        { path: '/inspectors', method: RequestMethod.POST },
        { path: '/reports/:params', method: RequestMethod.GET },
        { path: '/systools/:params', method: RequestMethod.GET },
        { path: '/auth/:params', method: RequestMethod.GET },
        { path: '/auth/:params', method: RequestMethod.POST }
      )
      .forRoutes('*');
  }
}
