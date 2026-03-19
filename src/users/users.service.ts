import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import type { Model, PaginateModel } from 'mongoose';
import { Types } from 'mongoose';

import { NoticeStatusType } from 'src/common/enums/status.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';
import { UserScope } from 'src/common/scope/user.scope';
import { BaseCrudService } from 'src/common/services/base.service';
import { Notice, NoticeDocument } from 'src/notices/models/notice.schema';
import { NoticesService } from 'src/notices/notices.service';
import { Request, RequestDocument } from 'src/requests/models/request.schema';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity, UserShortEntity } from './entities/user.entity';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UsersService extends BaseCrudService<
  UserDocument,
  UserEntity,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    @InjectModel(User.name) private readonly userModel: PaginateModel<UserDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>,
    @InjectModel(Notice.name) private readonly noticeModel: Model<NoticeDocument>,
    private readonly noticesService: NoticesService,
    private configService: ConfigService
  ) {
    super(userModel);
  }

  private async sendNotice(doc: UserEntity, title: string, status: NoticeStatusType) {
    const message = [
      doc.fullname && `Прізвище та ім'я: ${doc.fullname}`,
      doc.email && `Електронна пошта: ${doc.email}`,
      doc.phone && `Номер телефону: ${doc.phone}`
    ]
      .filter(Boolean)
      .join('\n');

    await this.noticesService.createOneByUser('user', status, title, message);
  }

  override async create(input: CreateUserInput): Promise<UserEntity> {
    const passwordHash = await bcrypt.hash(
      input.password,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    const result = await super.create({ ...input, password: passwordHash });

    void this.sendNotice(result, 'Створення користувача', NoticeStatusType.SUCCESS);

    return result;
  }

  async findAllActive(): Promise<UserShortEntity[]> {
    return await this.userModel.find({ status: UserStatus.ACTIVE }).exec();
  }

  async findAllForNotice(scopeMaskStr: string): Promise<UserEntity[]> {
    const filterMask = UserScope.deserialize(scopeMaskStr);

    if (filterMask === 0n) return [];

    const users = await this.userModel
      .find({ status: UserStatus.ACTIVE })
      .select({ _id: 1, scope: 1 })
      .lean();

    return users.filter(u => {
      try {
        const userMask = BigInt(u.scope ?? '0');
        return (userMask & filterMask) !== 0n;
      } catch {
        return false;
      }
    }) as unknown as UserEntity[];
  }

  async updateOneById(id: string, input: UpdateUserInput): Promise<UserEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор користувача');
    }

    try {
      const updateData = { ...input };

      if (input?.password) {
        updateData.password = await bcrypt.hash(
          input.password,
          Number(this.configService.get<number>('BCRYPT_SALT'))
        );
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, { $set: updateData }, { returnDocument: 'after' })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException('Користувача не знайдено');
      }

      return updatedUser;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error.code === 11000) {
        throw new BadRequestException('Користувач з такими даними вже існує');
      }
      throw new UnprocessableEntityException('Помилка при оновленні даних користувача');
    }
  }

  override async removeOneById(id: string): Promise<UserEntity> {
    const result = await super.removeOneById(id);

    await this.requestModel.deleteMany({ workerOpen: result.id });
    await this.requestModel.deleteMany({ workerClose: result.id });
    await this.noticeModel.deleteMany({ user: result.id });

    return result;
  }
}
