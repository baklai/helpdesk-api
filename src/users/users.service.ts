import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Types, PaginateModel, PaginateResult, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Request } from 'src/requests/schemas/request.schema';
import { Notice } from 'src/notices/schemas/notice.schema';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: PaginateModel<User>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
    private configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      Number(this.configService.get<number>('BCRYPT_SALT'))
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
        limit,
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
      throw new BadRequestException('Invalid record ID');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('Record not found');
    }

    return user;
  }

  async findOneByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login }).exec();

    if (!user) {
      throw new NotFoundException('Record not found');
    }

    return user;
  }

  async updateOneById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
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
                    Number(this.configService.get<number>('BCRYPT_SALT'))
                  )
                }
              : updateUserDto
          },
          { new: true }
        )
        .exec();

      if (!updatedUser) {
        throw new NotFoundException('Record not found');
      }

      return updatedUser;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async removeOneById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }

    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();

    if (!deletedUser) {
      throw new NotFoundException('Record not found');
    }

    await this.requestModel.deleteMany({
      workerOpen: deletedUser.id
    });

    await this.requestModel.deleteMany({
      workerClose: deletedUser.id
    });

    await this.noticeModel.deleteMany({
      user: deletedUser.id
    });

    return deletedUser;
  }

  /* PUBLIC METHODS */

  async findEmailsForUsersIsSubscribed() {
    const users = await this.userModel
      .find({ isSubscribed: true, isActive: true })
      .select({ email: 1 });

    return users.map(({ email }) => email);
  }

  async findUsersForNotice(records: string[]) {
    const users = await this.userModel
      .find({ isActive: true, _id: { $in: records } })
      .select({ id: 1, email: 1 });

    return {
      users: users.map(({ id }) => id),
      emails: users.map(({ email }) => email)
    };
  }
}
