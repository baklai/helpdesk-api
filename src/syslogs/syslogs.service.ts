import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult, Types } from 'mongoose';

import { Syslog } from './schemas/syslog.schema';
import { CreateSyslogDto } from './dto/create-syslog.dto';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

@Injectable()
export class SyslogsService {
  constructor(@InjectModel(Syslog.name) private readonly syslogModel: PaginateModel<Syslog>) {}

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
        limit: Number(limit) > 0 ? Number(limit) : await this.syslogModel.countDocuments(),
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async removeAll(): Promise<string> {
    const deletedSyslog = await this.syslogModel.deleteMany().exec();
    if (!deletedSyslog) {
      throw new NotFoundException('Syslog not found');
    }
    return 'Ok';
  }

  async findOneById(id: string): Promise<Syslog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid syslog ID');
    }
    const syslog = await this.syslogModel.findById(id).exec();
    if (!syslog) {
      throw new NotFoundException('Syslog not found');
    }
    return syslog;
  }

  async removeOneById(id: string): Promise<Syslog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid syslog ID');
    }
    const deletedSyslog = await this.syslogModel.findByIdAndRemove(id).exec();
    if (!deletedSyslog) {
      throw new NotFoundException('Syslog not found');
    }
    return deletedSyslog;
  }
}
