import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';

import { NoticeStatusType } from 'src/common/enums/status.enum';

@ObjectType('Notice', { description: 'Системне сповіщення' })
export class NoticeEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Заголовок повідомлення' })
  readonly title: string;

  @Field(() => String, { description: 'Текст повідомлення' })
  readonly message: string;

  @Field(() => NoticeStatusType, { description: 'Рівень важливості' })
  readonly status: NoticeStatusType;

  @Field(() => ID, { description: 'Ідентифікатор користувача' })
  readonly user: mongoose.Types.ObjectId;

  @Field(() => Date, { nullable: true, description: 'Дата автоматичного видалення 90 днів' })
  readonly expiresAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}
