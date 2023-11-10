import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
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
      const createdPosition = await this.positionModel.create(createPositionDto);
      return createdPosition;
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

  async findOneById(id: Types.ObjectId): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid position ID');
    }
    const position = await this.positionModel.findById(id).exec();
    if (!position) {
      throw new NotFoundException('Position not found');
    }
    return position;
  }

  async updateOneById(id: Types.ObjectId, updatePositionDto: UpdatePositionDto): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid position ID');
    }
    try {
      const updatedPosition = await this.positionModel
        .findByIdAndUpdate(id, { $set: updatePositionDto }, { new: true })
        .exec();
      if (!updatedPosition) {
        throw new NotFoundException('Position not found');
      }
      return updatedPosition;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A position with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: Types.ObjectId): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid position ID');
    }
    const deletedPosition = await this.positionModel.findByIdAndRemove(id).exec();
    if (!deletedPosition) {
      throw new NotFoundException('Position not found');
    }
    return deletedPosition;
  }
}
