import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NetmapsService } from './netmaps.service';
import { NetmapsController } from './netmaps.controller';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ipaddress.name, schema: IpaddressSchema }])],
  controllers: [NetmapsController],
  providers: [NetmapsService]
})
export class NetmapsModule {}
