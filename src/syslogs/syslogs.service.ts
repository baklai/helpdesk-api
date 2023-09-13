import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Syslog } from './schemas/syslog.schema';
import { SyslogDto } from './dto/syslog.dto';

@Injectable()
export class SyslogsService {
  constructor(@InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>) {}

  async create(syslogDto: SyslogDto): Promise<Syslog> {
    return await this.syslogModel.create(syslogDto);
  }

  async findAll(): Promise<Syslog[]> {
    return await this.syslogModel.find().exec();
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
