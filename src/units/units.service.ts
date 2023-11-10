import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Unit } from './schemas/unit.schema';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(@InjectModel(Unit.name) private readonly unitModel: Model<Unit>) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    try {
      return await this.unitModel.create(createUnitDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A unit with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Unit[]> {
    return await this.unitModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: Types.ObjectId): Promise<Unit> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid unit ID');
    }
    const unit = await this.unitModel.findById(id).exec();
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    return unit;
  }

  async updateOneById(id: Types.ObjectId, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid unit ID');
    }
    try {
      const updatedUnit = await this.unitModel
        .findByIdAndUpdate(id, { $set: updateUnitDto }, { new: true })
        .exec();
      if (!updatedUnit) {
        throw new NotFoundException('Unit not found');
      }
      return updatedUnit;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A unit with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: Types.ObjectId): Promise<Unit> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid unit ID');
    }
    const deletedUnit = await this.unitModel.findByIdAndRemove(id).exec();
    if (!deletedUnit) {
      throw new NotFoundException('Unit not found');
    }
    return deletedUnit;
  }
}
