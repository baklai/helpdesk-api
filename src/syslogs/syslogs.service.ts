import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginateModel, PaginateResult } from 'mongoose';
import { Types } from 'mongoose';

import { PaginateArgs } from 'src/common/dto/paginate.args';
import { sanitizeMongoFilters } from 'src/common/utils/lib.util';

import { CreateSysLogInput } from './dto/create-syslog.input';
import { SysLogEntity } from './entities/syslog.entity';
import { SysLog, SysLogDocument } from './models/syslog.schema';

@Injectable()
export class SysLogsService {
  constructor(
    @InjectModel(SysLog.name) private readonly sysLogModel: PaginateModel<SysLogDocument>
  ) {}

  async create(input: CreateSysLogInput): Promise<SysLogEntity> {
    try {
      const log = await this.sysLogModel.create(input);
      return log as unknown as SysLogEntity;
    } catch {
      throw new UnprocessableEntityException('Не вдалося створити системний лог');
    }
  }

  async findAll(args: PaginateArgs): Promise<PaginateResult<SysLogEntity>> {
    const { offset = 0, limit = 5, sort = { createdAt: -1 }, filters = {} } = args;

    const result = await this.sysLogModel.paginate(
      { ...sanitizeMongoFilters(filters) },
      {
        sort,
        offset,
        limit,
        lean: false,
        allowDiskUse: true
      }
    );

    return result as unknown as PaginateResult<SysLogEntity>;
  }

  async findOneById(id: string): Promise<SysLogEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор системного логу');
    }

    const syslog = await this.sysLogModel.findById(id).exec();

    if (!syslog) {
      throw new NotFoundException('Системний лог не знайдено');
    }

    return syslog as unknown as SysLogEntity;
  }

  async removeOneById(id: string): Promise<SysLogEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор системного логу');
    }

    const deletedSyslog = await this.sysLogModel.findByIdAndDelete(id).exec();

    if (!deletedSyslog) {
      throw new NotFoundException('Системний лог не знайдено');
    }

    return deletedSyslog as unknown as SysLogEntity;
  }

  async removeAll(): Promise<string> {
    try {
      await this.sysLogModel.deleteMany().exec();

      return 'Ok';
    } catch {
      throw new UnprocessableEntityException('Не вдалося очистити системний журнал');
    }
  }
}
