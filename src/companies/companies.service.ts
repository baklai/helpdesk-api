import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private readonly companyModel: Model<Company>) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      return await this.companyModel.create(createCompanyDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A company with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Company> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const company = await this.companyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException('Record not found');
    }
    return company;
  }

  async updateOneById(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedCompany = await this.companyModel
        .findByIdAndUpdate(id, { $set: updateCompanyDto }, { new: true })
        .exec();
      if (!updatedCompany) {
        throw new NotFoundException('Record not found');
      }
      return updatedCompany;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Company> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const deletedCompany = await this.companyModel.findByIdAndRemove(id).exec();
    if (!deletedCompany) {
      throw new NotFoundException('Record not found');
    }
    return deletedCompany;
  }
}
