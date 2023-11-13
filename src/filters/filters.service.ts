import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Filter } from './schemas/filter.schema';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { QueryFilterDto } from './dto/query-filter.dto';

@Injectable()
export class FiltersService {
  constructor(@InjectModel(Filter.name) private readonly filterModel: Model<Filter>) {}

  async create(createFilterDto: CreateFilterDto): Promise<Filter> {
    return await this.filterModel.create(createFilterDto);
  }

  async findAll(query: QueryFilterDto): Promise<Filter[]> {
    return await this.filterModel.find(query).exec();
  }

  async findOneById(id: string): Promise<Filter> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const filter = await this.filterModel.findById(id).exec();
    if (!filter) {
      throw new NotFoundException('Record not found');
    }
    return filter;
  }

  async updateOneById(id: string, updateFilterDto: UpdateFilterDto): Promise<Filter> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const updatedFilter = await this.filterModel
      .findByIdAndUpdate(id, { $set: updateFilterDto }, { new: true })
      .exec();
    if (!updatedFilter) {
      throw new NotFoundException('Record not found');
    }
    return updatedFilter;
  }

  async removeOneById(id: string): Promise<Filter> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedFilter = await this.filterModel.findByIdAndRemove(id).exec();
    if (!deletedFilter) {
      throw new NotFoundException('Record not found');
    }
    return deletedFilter;
  }
}
