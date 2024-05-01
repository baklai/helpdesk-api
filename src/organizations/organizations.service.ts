import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Organization } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name) private readonly organizationModel: Model<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    try {
      return await this.organizationModel.create(createOrganizationDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A organization with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationModel.find().exec();
  }

  async findOneById(id: string): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization) {
      throw new NotFoundException('Record not found');
    }
    return organization;
  }

  async updateOneById(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto
  ): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedOrganization = await this.organizationModel
        .findByIdAndUpdate(id, { $set: updateOrganizationDto }, { new: true })
        .exec();
      if (!updatedOrganization) {
        throw new NotFoundException('Record not found');
      }
      return updatedOrganization;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedOrganization = await this.organizationModel.findByIdAndRemove(id).exec();
    if (!deletedOrganization) {
      throw new NotFoundException('Record not found');
    }
    return deletedOrganization;
  }
}
