import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';
import { Request } from 'src/requests/schemas/request.schema';

import { Department } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private readonly departmentModel: Model<Department>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      return await this.departmentModel.create(createDepartmentDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Department> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const department = await this.departmentModel.findById(id).exec();
    if (!department) {
      throw new NotFoundException('Record not found');
    }
    return department;
  }

  async updateOneById(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedDepartment = await this.departmentModel
        .findByIdAndUpdate(id, { $set: updateDepartmentDto }, { new: true })
        .exec();
      if (!updatedDepartment) {
        throw new NotFoundException('Record not found');
      }
      return updatedDepartment;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Department> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }

    const deletedDepartment = await this.departmentModel.findByIdAndRemove(id).exec();

    if (!deletedDepartment) {
      throw new NotFoundException('Record not found');
    }

    await this.ipaddressModel.updateMany(
      { department: deletedDepartment.id },
      { $set: { department: null } }
    );
    await this.mailboxModel.updateMany(
      { department: deletedDepartment.id },
      { $set: { department: null } }
    );
    await this.requestModel.updateMany(
      { department: deletedDepartment.id },
      { $set: { department: null } }
    );

    return deletedDepartment;
  }
}
