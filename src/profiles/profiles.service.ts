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

import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: PaginateModel<Profile>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    @InjectModel(Notice.name) private readonly noticeModel: Model<Notice>,
    private configService: ConfigService
  ) {}

  async create(createUserDto: CreateProfileDto): Promise<Profile> {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    try {
      return await this.profileModel.create({
        ...createUserDto,
        password: passwordHash
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Profile>> {
    const { offset = 0, limit = 5, sort = { fullname: 1 }, filters = {} } = query;

    return await this.profileModel.paginate(
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

  async findOneById(id: string): Promise<Profile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const profile = await this.profileModel.findById(id).exec();

    if (!profile) {
      throw new NotFoundException('Запис не знайдено');
    }

    return profile;
  }

  async findOneByEmail(email: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({ email }).exec();

    if (!profile) {
      throw new NotFoundException('Запис не знайдено');
    }

    return profile;
  }

  async updateOneById(id: string, updateUserDto: UpdateProfileDto): Promise<Profile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    try {
      const updatedUser = await this.profileModel
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
        throw new NotFoundException('Запис не знайдено');
      }

      return updatedUser;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async removeOneById(id: string): Promise<Profile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const deletedUser = await this.profileModel.findByIdAndRemove(id).exec();

    if (!deletedUser) {
      throw new NotFoundException('Запис не знайдено');
    }

    await this.requestModel.deleteMany({
      workerOpen: deletedUser.id
    });

    await this.requestModel.deleteMany({
      workerClose: deletedUser.id
    });

    await this.noticeModel.deleteMany({
      profile: deletedUser.id
    });

    return deletedUser;
  }

  /* PUBLIC METHODS */

  async findEmailsIsNotice(scope: string) {
    const profiles = await this.profileModel
      .find({
        isActivated: true,
        $or: [{ scope: { $eq: scope } }, { isAdmin: true }]
      })
      .select({ email: 1 });

    return profiles.map(({ email }) => email);
  }

  async findEmailsIsAdmin() {
    const profiles = await this.profileModel
      .find({ isActivated: true, isAdmin: true })
      .select({ email: 1 });

    return profiles.map(({ email }) => email);
  }

  async findProfilesForNotice(records: string[]) {
    const profiles = await this.profileModel
      .find({ isActivated: true, _id: { $in: records } })
      .select({ id: 1, email: 1 });

    return {
      profiles: profiles.map(({ id }) => id),
      emails: profiles.map(({ email }) => email)
    };
  }
}
