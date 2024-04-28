import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Subdivision } from './schemas/subdivision.schema';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { UpdateSubdivisionDto } from './dto/update-subdivision.dto';

@Injectable()
export class SubdivisionsService {
  constructor(
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<Subdivision>
  ) {}

  async create(createSubdivisionDto: CreateSubdivisionDto): Promise<Subdivision> {
    try {
      return await this.subdivisionModel.create(createSubdivisionDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Subdivision[]> {
    return await this.subdivisionModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Subdivision> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const subdivision = await this.subdivisionModel.findById(id).exec();
    if (!subdivision) {
      throw new NotFoundException('Record not found');
    }
    return subdivision;
  }

  async updateOneById(
    id: string,
    updateSubdivisionDto: UpdateSubdivisionDto
  ): Promise<Subdivision> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedSubdivision = await this.subdivisionModel
        .findByIdAndUpdate(id, { $set: updateSubdivisionDto }, { new: true })
        .exec();
      if (!updatedSubdivision) {
        throw new NotFoundException('Record not found');
      }
      return updatedSubdivision;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Subdivision> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedSubdivision = await this.subdivisionModel.findByIdAndRemove(id).exec();
    if (!deletedSubdivision) {
      throw new NotFoundException('Record not found');
    }
    return deletedSubdivision;
  }
}
