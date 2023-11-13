import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Location } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      const createdLocation = await this.locationModel.create(createLocationDto);
      return createdLocation;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Location[]> {
    return await this.locationModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Location> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException('Record not found');
    }
    return location;
  }

  async updateOneById(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedLocation = await this.locationModel
        .findByIdAndUpdate(id, { $set: updateLocationDto }, { new: true })
        .exec();
      if (!updatedLocation) {
        throw new NotFoundException('Record not found');
      }
      return updatedLocation;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Location> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedLocation = await this.locationModel.findByIdAndRemove(id).exec();
    if (!deletedLocation) {
      throw new NotFoundException('Record not found');
    }
    return deletedLocation;
  }
}
