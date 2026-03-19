import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DepartmentsModule } from 'src/departments/departments.module';
import { DevicesModule } from 'src/devices/devices.module';
import { LocationsModule } from 'src/locations/locations.module';
import { NoticesModule } from 'src/notices/notices.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PositionsModule } from 'src/positions/positions.module';
import { SubdivisionsModule } from 'src/subdivisions/subdivisions.module';

import { IpaddressesResolver } from './ipaddresses.resolver';
import { IpaddressesService } from './ipaddresses.service';
import { Ipaddress, IpaddressSchema } from './models/ipaddress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ipaddress.name, schema: IpaddressSchema }]),
    NoticesModule,
    DevicesModule,
    LocationsModule,
    OrganizationsModule,
    SubdivisionsModule,
    DepartmentsModule,
    PositionsModule
  ],
  providers: [IpaddressesResolver, IpaddressesService],
  exports: [IpaddressesService]
})
export class IpaddressesModule {}
