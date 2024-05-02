import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Syslog, SyslogSchema } from 'src/syslogs/schemas/syslog.schema';
import { PingsService } from './pings.service';
import { PingsController } from './pings.controller';
import { Ping, PingSchema } from './schemas/ping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ping.name, schema: PingSchema },
      { name: Syslog.name, schema: SyslogSchema }
    ])
  ],
  controllers: [PingsController],
  providers: [PingsService]
})
export class PingsModule {}
