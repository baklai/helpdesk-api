import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PingsService } from './pings.service';
import { PingsController } from './pings.controller';
import { Ping, PingSchema } from './schemas/ping.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ping.name, schema: PingSchema }])],
  controllers: [PingsController],
  providers: [PingsService]
})
export class PingsModule {}
