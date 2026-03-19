import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DepartmentsModule } from 'src/departments/departments.module';
import { LocationsModule } from 'src/locations/locations.module';
import { NoticesModule } from 'src/notices/notices.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PositionsModule } from 'src/positions/positions.module';
import { SubdivisionsModule } from 'src/subdivisions/subdivisions.module';
import { UsersModule } from 'src/users/users.module';

import { Request, RequestSchema } from './models/request.schema';
import { RequestsResolver } from './requests.resolver';
import { RequestsService } from './requests.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    NoticesModule,
    UsersModule,
    LocationsModule,
    OrganizationsModule,
    SubdivisionsModule,
    DepartmentsModule,
    PositionsModule
  ],
  providers: [RequestsResolver, RequestsService],
  exports: [RequestsService]
})
export class RequestsModule {}
