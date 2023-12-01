import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Option } from 'src/options/schemas/option.schema';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(@InjectModel(Option.name) private readonly optionModel: Model<Option>) {}

  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    try {
      const createdOption = await this.optionModel.create(createOptionDto);
      return createdOption;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Option[]> {
    return await this.optionModel.find().exec();
  }

  async findOneById(id: string): Promise<Option> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const task = await this.optionModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Record not found');
    }
    return task;
  }

  async updateOneById(id: string, updateOptionDto: UpdateOptionDto): Promise<Option> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedOption = await this.optionModel
        .findByIdAndUpdate(id, { $set: updateOptionDto }, { new: true })
        .exec();
      if (!updatedOption) {
        throw new NotFoundException('Record not found');
      }
      return updatedOption;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Option> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedOption = await this.optionModel.findByIdAndRemove(id).exec();
    if (!deletedOption) {
      throw new NotFoundException('Record not found');
    }
    return deletedOption;
  }
}
