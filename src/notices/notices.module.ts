import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Notice, NoticeSchema } from './schemas/notice.schema';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }])],
  controllers: [NoticesController],
  providers: [NoticesService]
})
export class NoticesModule {}
