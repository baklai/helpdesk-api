import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, PaginateModel, PaginateResult, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';

import { Syslog } from './schemas/syslog.schema';
import { CreateSyslogDto } from './dto/create-syslog.dto';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Option } from 'src/options/schemas/option.schema';

@Injectable()
export class SyslogsService {
  constructor(
    @InjectModel(Syslog.name) private readonly syslogModel: PaginateModel<Syslog>,
    @InjectModel(Option.name) private readonly optionModel: Model<Option>
  ) {}

  async create(syslogDto: CreateSyslogDto): Promise<Syslog> {
    return await this.syslogModel.create(syslogDto);
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Syslog>> {
    const { offset = 0, limit = 5, sort = { createdAt: -1 }, filters = {} } = query;

    return await this.syslogModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit,
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async removeAll(): Promise<string> {
    const deletedSyslog = await this.syslogModel.deleteMany().exec();
    if (!deletedSyslog) {
      throw new NotFoundException('Record not found');
    }
    return 'Ok';
  }

  async findOneById(id: string): Promise<Syslog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const syslog = await this.syslogModel.findById(id).exec();
    if (!syslog) {
      throw new NotFoundException('Record not found');
    }
    return syslog;
  }

  async removeOneById(id: string): Promise<Syslog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedSyslog = await this.syslogModel.findByIdAndRemove(id).exec();
    if (!deletedSyslog) {
      throw new NotFoundException('Record not found');
    }
    return deletedSyslog;
  }

  @Cron('0 0 * * * *')
  async handleTaskSysLogger() {
    let error = false;
    const monthOffcet = new Date();
    monthOffcet.setMonth(monthOffcet.getMonth() - 1);
    try {
      await this.syslogModel.deleteMany({ createdAt: { $lt: monthOffcet } }).exec();
    } catch (err) {
      error = true;
    } finally {
      console.info(`127.0.0.1 [system] TASK ${error ? 500 : 200} - Clear logs`);
      await this.syslogModel.create({
        host: '127.0.0.1',
        user: 'system',
        method: 'TASK',
        baseUrl: 'Clear logs',
        params: null,
        query: null,
        body: null,
        status: error ? 500 : 200,
        userAgent: null
      });
    }
  }
}
