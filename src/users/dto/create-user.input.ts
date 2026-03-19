import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches
} from 'class-validator';

import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';

@InputType({ description: 'Створення користувача' })
export class CreateUserInput {
  @Field(() => String, { description: 'Електронна пошта' })
  @IsEmail({}, { message: 'Некоректний формат електронної пошти' })
  @IsNotEmpty({ message: "Електронна пошта є обов'язковою" })
  readonly email: string;

  @Field(() => String, { description: 'Пароль (мінімум 8 символів)' })
  @IsNotEmpty({ message: "Пароль є обов'язковим" })
  @IsString()
  readonly password: string;

  @Field(() => String, { description: "Прізвище та ім'я" })
  @IsNotEmpty({ message: "Прізвище та ім'я є обов'язковими" })
  @IsString({ message: "Прізвище та ім'я мають бути рядком" })
  readonly fullname: string;

  @Field(() => String, { description: 'Номер телефону (UA)' })
  @IsPhoneNumber(undefined, { message: 'Некоректний формат номера телефону' })
  @IsNotEmpty({ message: "Номер телефону є обов'язковим" })
  readonly phone: string;

  @Field(() => UserStatus, {
    nullable: true,
    defaultValue: UserStatus.ACTIVE,
    description: 'Статус облікового запису'
  })
  @IsEnum(UserStatus, { message: 'Некоректний статус' })
  @IsOptional()
  readonly status?: UserStatus;

  @Field(() => UserRole, {
    nullable: true,
    defaultValue: UserRole.CLIENT,
    description: 'Роль у системі'
  })
  @IsEnum(UserRole, { message: 'Некоректна роль' })
  @IsOptional()
  readonly role?: UserRole;

  @Field(() => String, {
    nullable: true,
    defaultValue: '0',
    description: 'Bitmask прав доступу (серіалізований BigInt у вигляді рядка)'
  })
  @IsString({ message: 'Scope має бути рядком' })
  @Matches(/^\d+$/, { message: 'Scope має бути числовим рядком (серіалізований BigInt)' })
  @IsOptional()
  readonly scope?: string;
}
