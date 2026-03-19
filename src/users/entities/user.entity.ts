import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';
import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';

@ObjectType('UserShort', { description: 'Користувач системи' })
export class UserShortEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  id: string;

  @Field(() => String, { description: "Прізвище та ім'я" })
  fullname: string;
}

@ObjectType('User', { description: 'Користувач системи' })
export class UserEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  id: string;

  @Field(() => String, { description: "Прізвище та ім'я" })
  fullname: string;

  @Field(() => String, { description: 'Електронна пошта' })
  email: string;

  @Field(() => String, { description: 'Номер телефону' })
  phone: string;

  @Field(() => UserStatus, {
    description: 'Статус облікового запису',
    defaultValue: UserStatus.PENDING
  })
  status: UserStatus;

  @Field(() => UserRole, { description: 'Роль користувача', defaultValue: UserRole.CLIENT })
  role: UserRole;

  @Field(() => String, {
    description: 'Bitmask прав доступу (серіалізований BigInt)',
    defaultValue: '0'
  })
  scope: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  updatedAt?: Date;
}

@ObjectType()
export class UserPaginated extends PaginatedBase implements PaginatedDocs<UserEntity> {
  @Field(() => [UserEntity], { description: 'Список користувачів' })
  docs: UserEntity[];
}
