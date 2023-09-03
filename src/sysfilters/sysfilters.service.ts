import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Sysfilter } from './schemas/sysfilter.schema';
import { CreateSysfilterDto } from './dto/create-sysfilter.dto';
import { UpdateSysfilterDto } from './dto/update-sysfilter.dto';
import { QuerySysfilterDto } from './dto/query-sysfilter.dto';

@Injectable()
export class SysfiltersService {
  constructor(@InjectModel(Sysfilter.name) private readonly filterModel: Model<Sysfilter>) {}

  async create(createSysfilterDto: CreateSysfilterDto): Promise<Sysfilter> {
    const createdBranch = await this.filterModel.create(createSysfilterDto);
    return createdBranch;
  }

  async findAll(query: QuerySysfilterDto): Promise<Sysfilter[]> {
    return await this.filterModel.find(query).exec();
  }

  async findOneById(id: string): Promise<Sysfilter> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid filter ID');
    }
    const filter = await this.filterModel.findById(id).exec();
    if (!filter) {
      throw new NotFoundException('Filter not found');
    }
    return filter;
  }

  async updateOneById(id: string, updateSysfilterDto: UpdateSysfilterDto): Promise<Sysfilter> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid filter ID');
    }
    const updatedBranch = await this.filterModel
      .findByIdAndUpdate(id, { $set: updateSysfilterDto }, { new: true })
      .exec();
    if (!updatedBranch) {
      throw new NotFoundException('Filter not found');
    }
    return updatedBranch;
  }

  async removeOneById(id: string): Promise<Sysfilter> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid filter ID');
    }
    const deletedBranch = await this.filterModel.findByIdAndRemove(id).exec();
    if (!deletedBranch) {
      throw new NotFoundException('Filter not found');
    }
    return deletedBranch;
  }
}
