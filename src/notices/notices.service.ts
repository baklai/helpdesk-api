import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model, Types } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Syslog } from 'src/syslogs/schemas/syslog.schema';

import { Notice } from './schemas/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
    @InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>,
    private readonly mailerService: MailerService
  ) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice[]> {
    const users = await this.userModel
      .find({ isActive: true, _id: { $in: createNoticeDto.users } })
      .select({ id: 1, email: 1 });

    const notices = users.map(user => {
      return {
        title: createNoticeDto.title,
        text: createNoticeDto.text,
        user: user.id
      };
    });

    const emails = users.map(({ email }) => email);

    this.mailerService.sendNotice(emails, {
      title: createNoticeDto.title,
      text: createNoticeDto.text
    });

    return await this.noticeModel.create(notices);
  }

  async findAll(user: string): Promise<Notice[]> {
    if (!Types.ObjectId.isValid(user)) {
      throw new BadRequestException('Invalid record ID');
    }

    return await this.noticeModel.find({ user }).exec();
  }

  async removeOneById(id: string, user: string): Promise<Notice> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }

    const deletedNotice = await this.noticeModel.findOneAndRemove({ _id: id, user }).exec();

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
