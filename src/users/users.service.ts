import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Types, PaginateModel, PaginateResult } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: PaginateModel<User>,
    private configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      this.configService.get('bcryptSalt')
    );
    try {
      return await this.userModel.create({
        ...createUserDto,
        password: passwordHash
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<User>> {
    const { offset = 0, limit = 5, sort = { fullname: 1 }, filters = {} } = query;

    return await this.userModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit: Number(limit) > 0 ? Number(limit) : await this.userModel.countDocuments(),
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findAllMe(): Promise<User[]> {
    return await this.userModel.find().select({ id: 1, login: 1, fullname: 1 }).exec();
  }

  async findOneById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateOneById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          {
            $set: updateUserDto?.password
              ? {
                  ...updateUserDto,
                  password: await bcrypt.hash(
                    updateUserDto.password,
                    this.configService.get('bcryptSalt')
                  )
                }
              : updateUserDto
          },
          { new: true }
        )
        .exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async removeOneById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
