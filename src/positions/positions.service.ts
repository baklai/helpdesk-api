import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Position } from './schemas/position.schema';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(@InjectModel(Position.name) private readonly positionModel: Model<Position>) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    try {
      return await this.positionModel.create(createPositionDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A position with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Position[]> {
    return await this.positionModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const position = await this.positionModel.findById(id).exec();
    if (!position) {
      throw new NotFoundException('Record not found');
    }
    return position;
  }

  async updateOneById(id: string, updatePositionDto: UpdatePositionDto): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedPosition = await this.positionModel
        .findByIdAndUpdate(id, { $set: updatePositionDto }, { new: true })
        .exec();
      if (!updatedPosition) {
        throw new NotFoundException('Record not found');
      }
      return updatedPosition;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A position with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedPosition = await this.positionModel.findByIdAndRemove(id).exec();
    if (!deletedPosition) {
      throw new NotFoundException('Record not found');
    }
    return deletedPosition;
  }
}
