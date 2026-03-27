import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { NoticeStatusType } from 'src/common/enums/status.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';
import { type ScopeResource, UserScope } from 'src/common/scope/user.scope';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { User, UserDocument } from 'src/users/models/user.schema';

import { CreateNoticeInput } from './dto/create-notice.input';
import { NoticeEntity } from './entities/notice.entity';
import { Notice, NoticeDocument } from './models/notice.schema';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private readonly noticeModel: Model<NoticeDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(input: CreateNoticeInput): Promise<boolean> {
    if (!input.users?.length) {
      return false;
    }

    try {
      const noticesData = input.users.map(userId => ({
        user: userId,
        status: input.status,
        title: input.title,
        message: input.message
      }));

      await this.noticeModel.create(noticesData);

      return true;
    } catch {
      throw new UnprocessableEntityException(
        'Не вдалося створити сповіщення. Перевірте коректність даних'
      );
    }
  }

  async createOneByUser(
    resource: ScopeResource,
    status = NoticeStatusType.SECONDARY,
    title: string,
    message: string
  ): Promise<boolean> {
    try {
      const noticeMask = UserScope.getBit(resource, 'notice');

      if (noticeMask === 0n) return false;

      const userslist = await this.userModel
        .find({ status: UserStatus.ACTIVE })
        .select({ _id: 1, scope: 1 })
        .lean();

      const users = userslist
        .filter(u => {
          try {
            const userMask = BigInt(u.scope ?? '0');
            return (userMask & noticeMask) === noticeMask;
          } catch {
            return false;
          }
        })
        .map(u => ({ id: u._id.toString() }));

      if (users.length > 0) {
        const noticesData = users.map(({ id }) => ({
          user: id,
          status,
          title,
          message
        }));

        await this.noticeModel.create(noticesData);
      }

      return true;
    } catch {
      return false;
    }
  }

  async findAll(user: JwtPayload): Promise<NoticeEntity[]> {
    const userId = user.id;

    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Недійсний ідентифікатор користувача');
    }

    return await this.noticeModel.find({ user: userId }).exec();
  }

  async removeOneById(id: string, user: JwtPayload): Promise<NoticeEntity> {
    const userId = user.id;

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор сповіщення');
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Недійсний ідентифікатор профілю');
    }

    const deletedNotice = await this.noticeModel.findOneAndDelete({ _id: id, user: userId }).exec();

    if (!deletedNotice) {
      throw new NotFoundException('Сповіщення не знайдено');
    }

    return deletedNotice;
  }
}
