import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { Logger } from 'src/loggers/schemas/logger.schema';
import { Notice } from 'src/notices/schemas/notice.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Logger.name) private readonly loggerModel: Model<Logger>,
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>
  ) {}

  @Cron('0 0 * * * *')
  async handleCronNotice() {
    const monthOffcet = new Date();
    monthOffcet.setMonth(monthOffcet.getMonth() - 3);
    await this.noticeModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
  }

  @Cron('0 0 * * * *')
  async handleCronLogger() {
    const monthOffcet = new Date();
    monthOffcet.setMonth(monthOffcet.getMonth() - 1);
    await this.loggerModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
  }
}
