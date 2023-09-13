import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Syslog, SyslogSchema } from 'src/syslogs/schemas/syslog.schema';
import { Notice, NoticeSchema } from 'src/notices/schemas/notice.schema';

import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Syslog.name, schema: SyslogSchema },
      { name: Notice.name, schema: NoticeSchema }
    ])
  ],
  providers: [TasksService]
})
export class TasksModule {}
