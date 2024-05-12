import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';
import { ProfilesModule } from 'src/profiles/profiles.module';

import { Ipaddress, IpaddressSchema } from './schemas/ipaddress.schema';
import { IpaddressesController } from './ipaddresses.controller';
import { IpaddressesService } from './ipaddresses.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Inspector.name, schema: InspectorSchema }
    ]),
    ProfilesModule
  ],
  controllers: [IpaddressesController],
  providers: [IpaddressesService]
})
export class IpaddressesModule {}
