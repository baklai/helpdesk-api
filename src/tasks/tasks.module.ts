import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Logger, LoggerSchema } from 'src/loggers/schemas/logger.schema';
import { Notice, NoticeSchema } from 'src/notices/schemas/notice.schema';

import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Logger.name, schema: LoggerSchema },
      { name: Notice.name, schema: NoticeSchema }
    ])
  ],
  providers: [TasksService]
})
export class TasksModule {}
