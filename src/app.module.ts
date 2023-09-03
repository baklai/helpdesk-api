import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Schema } from 'mongoose';
import { join } from 'path';
import * as mongooseAutopopulate from 'mongoose-autopopulate';
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
import * as mongoosePaginate from 'mongoose-paginate-v2';

import appConfig from './config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ChannelsModule } from './channels/channels.module';
import { IpaddressesModule } from './ipaddresses/ipaddresses.module';
import { InspectorsModule } from './inspectors/inspectors.module';
import { RequestsModule } from './requests/requests.module';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { EnterprisesModule } from './enterprises/enterprises.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { UnitsModule } from './units/units.module';
import { LocationsModule } from './locations/locations.module';
import { SysfiltersModule } from './sysfilters/sysfilters.module';
import { NoticesModule } from './notices/notices.module';
import { LoggersModule } from './loggers/loggers.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SystoolsModule } from './systools/systools.module';
import { FilehostingModule } from './filehosting/filehosting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/(.*)']
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoURI'),
        connectionFactory: (connection) => {
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
    UsersModule,
    EventsModule,
    ChannelsModule,
    IpaddressesModule,
    RequestsModule,
    InspectorsModule,
    NoticesModule,
    CompaniesModule,
    BranchesModule,
    EnterprisesModule,
    DepartmentsModule,
    PositionsModule,
    LocationsModule,
    UnitsModule,
    SysfiltersModule,
    StatisticsModule,
    SystoolsModule,
    LoggersModule,
    FilehostingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
