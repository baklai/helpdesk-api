import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Notice } from 'src/notices/schemas/notice.schema';
import { Ping } from 'src/pings/schemas/ping.schema';
import { Syslog } from 'src/syslogs/schemas/syslog.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>,
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
    @InjectModel(Ping.name) private readonly pingModel: Model<Ping>
  ) {}

  @Cron('0 0 * * * *')
  async handleTaskSysLogs() {
    let error = false;
    const monthOffcet = new Date();
    monthOffcet.setMonth(monthOffcet.getMonth() - 3);
    try {
      await this.syslogModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
    } catch (err) {
      error = true;
    } finally {
      console.info(`127.0.0.1 [system] TASK ${error ? 500 : 200} - CLEAR LOGS`);
      await this.syslogModel.create({
        host: '127.0.0.1',
        user: 'system',
        method: 'TASK',
        baseUrl: 'CLEAR LOGS',
        params: null,
        query: null,
        body: null,
        status: error ? 500 : 200,
        userAgent: null
      });
    }
  }

  @Cron('0 0 * * * *')
  async handleTaskPing() {
    let error = false;
    const monthOffcet = new Date();
    monthOffcet.setMonth(monthOffcet.getMonth() - 6);
    try {
      await this.pingModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
    } catch (err) {
      error = true;
    } finally {
      console.info(`127.0.0.1 [system] TASK ${error ? 500 : 200} - CLEAR PINGs`);
      await this.syslogModel.create({
        host: '127.0.0.1',
        user: 'system',
        method: 'TASK',
        baseUrl: 'CLEAR PINGs',
        params: null,
        query: null,
        body: null,
        status: error ? 500 : 200,
        userAgent: null
      });
    }
  }

  @Cron('0 0 * * * *')
  async handleTaskNotice() {
    let error = false;
    const monthOffcet = new Date();
    monthOffcet.setMonth(monthOffcet.getMonth() - 3);
    try {
      await this.noticeModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
    } catch (err) {
      error = true;
    } finally {
      console.info(`127.0.0.1 [system] TASK ${error ? 500 : 200} - CLEAR NOTICES`);
      await this.syslogModel.create({
        host: '127.0.0.1',
        user: 'system',
        method: 'TASK',
        baseUrl: 'CLEAR NOTICES',
        params: null,
        query: null,
        body: null,
        status: error ? 500 : 200,
        userAgent: null
      });
    }
  }
}
