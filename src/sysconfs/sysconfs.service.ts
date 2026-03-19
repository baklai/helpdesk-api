import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpsertSysConfInput } from './dto/upsert-sysconf.input';
import { SysConfEntity } from './entities/sysconf.entity';
import { SysConf, SysConfDocument } from './models/sysconf.schema';

@Injectable()
export class SysConfsService {
  constructor(@InjectModel(SysConf.name) private readonly sysConfModel: Model<SysConfDocument>) {}

  async upsert(input: UpsertSysConfInput): Promise<SysConfEntity> {
    try {
      const result = await this.sysConfModel
        .findOneAndUpdate(
          { key: input.key },
          { $set: input },
          { returnDocument: 'after', upsert: true }
        )
        .exec();

      return result;
    } catch {
      throw new UnprocessableEntityException('Не вдалося зберегти налаштування');
    }
  }

  async findAll(): Promise<SysConfEntity[]> {
    return await this.sysConfModel.find().exec();
  }
}
