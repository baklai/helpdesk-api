import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIP,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

import { InternetStatusType } from 'src/common/enums/status.enum';

@InputType({ description: 'Параметри мережевої маски' })
export class CreateCIDRInput {
  @Field(() => Number, { description: 'Префікс (напр. 24)' })
  @IsNumber({}, { message: 'Префікс має бути числом' })
  readonly value: number;

  @Field(() => String, { description: 'Маска (напр. 255.255.255.0)' })
  @IsString({ message: 'Маска має бути рядком' })
  readonly mask: string;
}

@InputType({ description: 'Доступ до мережі Інтернет' })
export class CreateInternetInput {
  @Field(() => String, { nullable: true, description: 'Номер розпорядження' })
  @IsOptional()
  @IsString({ message: 'Номер розпорядження має бути рядком' })
  readonly reqnum?: string;

  @Field(() => InternetStatusType, { nullable: true, description: 'Статус доступу' })
  @IsOptional()
  @IsEnum(InternetStatusType, { message: 'Недійсний тип статусу' })
  readonly status?: InternetStatusType;

  @Field(() => String, { nullable: true, description: 'Примітка' })
  @IsOptional()
  @IsString({ message: 'Примітка має бути рядком' })
  readonly comment?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  @IsOptional()
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  @IsOptional()
  readonly updatedAt?: Date;
}

@InputType({ description: 'Створення IP-адреси' })
export class CreateIpaddressInput {
  @Field(() => String, { description: 'IPv4-адреса' })
  @IsIP(4, { message: 'Недійсний формат IPv4-адреси' })
  readonly ipaddress: string;

  @Field(() => CreateCIDRInput, { description: 'Налаштування CIDR' })
  @Type(() => CreateCIDRInput)
  @ValidateNested({ message: 'Недійсні параметри CIDR' })
  readonly cidr: CreateCIDRInput;

  @Field(() => String, { description: 'Номер запиту' })
  @IsString({ message: 'Номер запиту має бути рядком' })
  readonly reqnum: string;

  @Field(() => String, { description: "Прізвище та ім'я клієнта" })
  @IsString({ message: 'Прізвище та ім’я клієнта має бути рядком' })
  readonly fullname: string;

  @Field(() => String, { nullable: true, description: 'Контактний телефон' })
  @IsOptional()
  @IsString({ message: 'Номер телефону має бути рядком' })
  readonly phone?: string;

  @Field(() => String, { nullable: true, description: 'Електронна пошта' })
  @IsOptional()
  @IsString({ message: 'Електронна пошта має бути рядком' })
  readonly email?: string;

  @Field(() => String, { nullable: true, description: 'Коментар' })
  @IsOptional()
  @IsString({ message: 'Коментар має бути рядком' })
  readonly comment?: string;

  @Field(() => CreateInternetInput, { nullable: true, description: 'Доступ до Інтернету' })
  @IsOptional()
  @Type(() => CreateInternetInput)
  @ValidateNested()
  readonly internet?: CreateInternetInput;

  @Field(() => String, { nullable: true, description: 'Інвентарний номер' })
  @IsString({ message: 'Інвентарний номер має бути рядком' })
  readonly inventory?: string;

  @Field(() => String, { nullable: true, description: 'Автовідповідь' })
  @IsOptional()
  @IsString({ message: 'Автовідповідь має бути рядком' })
  readonly autoanswer?: string;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор пристрою' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор пристрою' })
  readonly device?: string;

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
