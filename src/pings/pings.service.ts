import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, PaginateModel, PaginateResult, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import ping, { pingResponse } from 'pingman';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Syslog } from 'src/syslogs/schemas/syslog.schema';
import { CreatePingDto } from './dto/create-ping.dto';
import { Ping } from './schemas/ping.schema';

@Injectable()
export class PingsService {
  constructor(
    @InjectModel(Ping.name) private readonly pingModel: PaginateModel<Ping>,
    @InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>
  ) {}

  async create({ host }: CreatePingDto): Promise<Ping> {
    const response: pingResponse = await ping(host, { timeout: 3, IPV4: true });
    const createdPing = await this.pingModel.create({ ...response });
    if (!createdPing) {
      throw new NotFoundException('Ping not found');
    }
    return createdPing;
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Ping>> {
    const { offset = 0, limit = 5, sort = { updatedat: -1 }, filters = {} } = query;

    return await this.pingModel.paginate(
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

  async findOneById(id: string, populate: boolean = false): Promise<Ping> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid mailbox ID');
    }
    const mailbox = await this.pingModel
      .findById(id, null, {
        autopopulate: populate
      })
      .exec();
    if (!mailbox) {
      throw new NotFoundException('Ping not found');
    }
    return mailbox;
  }

  async removeOneById(id: string): Promise<Ping> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid mailbox ID');
    }
    const deletedPing = await this.pingModel.findByIdAndRemove(id).exec();
    if (!deletedPing) {
      throw new NotFoundException('Ping not found');
    }
    return deletedPing;
  }

  @Cron('0 0 * * *')
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
}
