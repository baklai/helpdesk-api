import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Ping, PingSchema } from 'src/pings/schemas/ping.schema';
import { Syslog, SyslogSchema } from 'src/syslogs/schemas/syslog.schema';
import { Notice, NoticeSchema } from 'src/notices/schemas/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Syslog.name, schema: SyslogSchema },
      { name: Notice.name, schema: NoticeSchema },
      { name: Ping.name, schema: PingSchema }
    ])
  ],
  providers: [TasksService]
})
export class TasksModule {}
