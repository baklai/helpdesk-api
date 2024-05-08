import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress, IpaddressSchema } from './schemas/ipaddress.schema';
import { IpaddressesController } from './ipaddresses.controller';
import { IpaddressesService } from './ipaddresses.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Inspector.name, schema: InspectorSchema }
    ]),
    UsersModule
  ],
  controllers: [IpaddressesController],
  providers: [IpaddressesService]
})
export class IpaddressesModule {}
