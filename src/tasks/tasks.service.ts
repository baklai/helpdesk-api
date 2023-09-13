import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { Syslog } from 'src/syslogs/schemas/syslog.schema';
import { Notice } from 'src/notices/schemas/notice.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>,
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
    await this.syslogModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
  }
}
