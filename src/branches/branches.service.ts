import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Branch } from './schemas/branch.schema';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(@InjectModel(Branch.name) private readonly branchModel: Model<Branch>) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    try {
      return await this.branchModel.create(createBranchDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Branch> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const branch = await this.branchModel.findById(id).exec();
    if (!branch) {
      throw new NotFoundException('Record not found');
    }
    return branch;
  }

  async updateOneById(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedBranch = await this.branchModel
        .findByIdAndUpdate(id, { $set: updateBranchDto }, { new: true })
        .exec();
      if (!updatedBranch) {
        throw new NotFoundException('Record not found');
      }
      return updatedBranch;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern?.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Branch> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedBranch = await this.branchModel.findByIdAndRemove(id).exec();
    if (!deletedBranch) {
      throw new NotFoundException('Record not found');
    }
    return deletedBranch;
  }
}
