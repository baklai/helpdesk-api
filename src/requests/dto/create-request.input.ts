import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsIP, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RequestStatusType } from 'src/common/enums/status.enum';

@InputType({ description: 'Створення заявки' })
export class CreateRequestInput {
  @Field(() => String, { description: 'Прізвище та ім’я заявника' })
  @IsString({ message: 'Прізвище та ім’я має бути рядком' })
  @IsNotEmpty({ message: 'Прізвище та ім’я є обов’язковим' })
  readonly fullname: string;

  @Field(() => String, { description: 'Контактний номер телефону' })
  @IsString({ message: 'Телефон повинен бути рядком' })
  @IsNotEmpty({ message: 'Номер телефону є обов’язковим' })
  readonly phone: string;

  @Field(() => String, { nullable: true, description: 'IP-адреса заявника' })
  @IsOptional()
  @IsIP(4, { message: 'Недійсний формат IPv4-адреси' })
  readonly ipaddress?: string;

  @Field(() => String, { nullable: true, description: 'Внутрішній номер запиту' })
  @IsOptional()
  @IsString({ message: 'Номер запиту має бути рядком' })
  readonly reqnum?: string;

  @Field(() => String, { description: 'Опис проблеми' })
  @IsString({ message: 'Текст запиту має бути рядком' })
  @IsNotEmpty({ message: 'Текст запиту є обов’язковим' })
  readonly request: string;

  @Field(() => String, { nullable: true, description: 'Коментар технічного спеціаліста' })
  @IsOptional()
  @IsString({ message: 'Коментар має бути рядком' })
  readonly comment?: string;

  @Field(() => String, { nullable: true, description: 'Результат вирішення' })
  @IsOptional()
  @IsString({ message: 'Висновок має бути рядком' })
  readonly conclusion?: string;

  @Field(() => ID, { nullable: true, description: 'Профіль користувача' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор профілю' })
  readonly opened?: string;

  @Field(() => ID, { nullable: true, description: 'Профіль користувача' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор профілю' })
  readonly closed?: string;

  @Field(() => RequestStatusType, { nullable: true, description: 'Статус поточної заявки' })
  @IsOptional()
  @IsEnum(RequestStatusType, { message: 'Недійсний статус заявки' })
  readonly status?: RequestStatusType;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор локації' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор локації' })
  readonly location?: string;

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
