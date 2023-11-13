import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from './schemas/ipaddress.schema';
import { IpaddressesController } from './ipaddresses.controller';
import { IpaddressesService } from './ipaddresses.service';
import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Inspector.name, schema: InspectorSchema }
    ])
  ],
  controllers: [IpaddressesController],
  providers: [IpaddressesService]
})
export class IpaddressesModule {}
