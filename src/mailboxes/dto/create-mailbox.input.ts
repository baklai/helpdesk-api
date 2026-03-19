import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MailboxStatusType } from 'src/common/enums/status.enum';

@InputType({ description: 'Створення поштової скриньки' })
export class CreateMailboxInput {
  @Field(() => String, { description: 'Номер листа/розпорядження' })
  @IsString({ message: 'Номер листа має бути рядком' })
  @IsNotEmpty({ message: 'Номер листа є обов\u2019язковим' })
  readonly reqnum: string;

  @Field(() => String, { description: 'Електронна пошта' })
  @IsEmail({}, { message: 'Недійсний формат електронної пошти' })
  @IsNotEmpty({ message: 'Електронна пошта є обов\u2019язковою' })
  readonly email: string;

  @Field(() => String, { description: 'Прізвище та ім\u2019я користувача' })
  @IsString({ message: 'Прізвище та ім\u2019я повинні бути рядком' })
  @IsNotEmpty({ message: 'Прізвище та ім\u2019я є обов\u2019язковим' })
  readonly fullname: string;

  @Field(() => String, { description: 'Контактний номер телефону' })
  @IsString({ message: 'Номер телефону повинен бути рядком' })
  @IsNotEmpty({ message: 'Телефон є обов\u2019язковим' })
  readonly phone: string;

  @Field(() => MailboxStatusType, { nullable: true, description: 'Статус поштової скриньки' })
  @IsOptional()
  @IsEnum(MailboxStatusType, { message: 'Недійсний статус поштової скриньки' })
  readonly status?: MailboxStatusType;

  @Field(() => String, { nullable: true, description: 'Коментар' })
  @IsOptional()
  @IsString({ message: 'Коментар має бути рядком' })
  readonly comment?: string;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор організації' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор організації' })
  readonly organization?: string;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор підрозділу' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор підрозділу' })
  readonly subdivision?: string;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор відділу' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор відділу' })
  readonly department?: string;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор посади' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор посади' })
  readonly position?: string;
}
