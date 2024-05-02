import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model, Types } from 'mongoose';

import { Syslog } from 'src/syslogs/schemas/syslog.schema';
import { Notice } from './schemas/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
    @InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>
  ) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return await this.noticeModel.create(createNoticeDto);
  }

  async findAll(userId: string): Promise<Notice[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid record ID');
    }
    return await this.noticeModel.find({ userId }).exec();
  }

  async removeOneById(id: string, userId: string): Promise<Notice> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedNotice = await this.noticeModel.findOneAndRemove({ _id: id, userId }).exec();
    if (!deletedNotice) {
      throw new NotFoundException('Record not found');
    }
    return deletedNotice;
  }

  @Cron('0 0 * * *')
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
