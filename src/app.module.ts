import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongooseAutopopulate from 'mongoose-autopopulate';
import mongoosePaginate from 'mongoose-paginate-v2';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

import appConfig from './common/config/app.config';
import { HttpExceptionFilter } from './common/filters/graphql-exception.filter';
import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard';
import { GraphqlLoggerInterceptor } from './common/interceptors/logger.interceptor';

import { AuthModule } from './auth/auth.module';
import { ChannelsModule } from './channels/channels.module';
import { DepartmentsModule } from './departments/departments.module';
import { DevicesModule } from './devices/devices.module';
import { EventsModule } from './events/events.module';
import { InspectorsModule } from './inspectors/inspectors.module';
import { IpaddressesModule } from './ipaddresses/ipaddresses.module';
import { LocationsModule } from './locations/locations.module';
import { MailboxesModule } from './mailboxes/mailboxes.module';
import { NoticesModule } from './notices/notices.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PositionsModule } from './positions/positions.module';
import { ReportsModule } from './reports/reports.module';
import { RequestsModule } from './requests/requests.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SubdivisionsModule } from './subdivisions/subdivisions.module';
import { SysConfsModule } from './sysconfs/sysconfs.module';
import { SysLogsModule } from './syslogs/syslogs.module';
import { SysToolsModule } from './systools/systools.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig]
    }),
    ScheduleModule.forRoot(),
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
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 50 }]
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: true,
        sortSchema: false,
        playground: false,
        path: '/',
        debug: configService.get<string>('NODE_ENV') !== 'production',
        introspection: configService.get<string>('NODE_ENV') !== 'production',
        graphiql: configService.get<string>('NODE_ENV') !== 'production',
        context: ({ req, res }) => ({ req, res }),
        formatError: (error: any) => {
          if (configService.get<string>('NODE_ENV') === 'production') {
            const { message, extensions } = error;
            return {
              message,
              extensions: {
                code: extensions?.code ?? 'INTERNAL_SERVER_ERROR'
              }
            };
          }
          return error;
        }
      })
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    IpaddressesModule,
    MailboxesModule,
    RequestsModule,
    InspectorsModule,
    NoticesModule,
    OrganizationsModule,
    SubdivisionsModule,
    DepartmentsModule,
    PositionsModule,
    LocationsModule,
    DevicesModule,
    ReportsModule,
    SysToolsModule,
    SysLogsModule,
    SysConfsModule,
    StatisticsModule,
    ChannelsModule
  ],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphqlLoggerInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ]
})
export class AppModule {}
