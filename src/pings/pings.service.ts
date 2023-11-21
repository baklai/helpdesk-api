import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginateModel, PaginateResult, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import ping, { pingResponse } from 'pingman';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { CreatePingDto } from './dto/create-ping.dto';
import { Ping } from './schemas/ping.schema';

@Injectable()
export class PingsService {
  constructor(@InjectModel(Ping.name) private readonly pingModel: PaginateModel<Ping>) {}

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
}
