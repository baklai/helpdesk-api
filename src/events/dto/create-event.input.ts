import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { EventType } from 'src/common/enums/event.enum';

@InputType({ description: 'Створення події' })
export class CreateEventInput {
  @Field(() => String, { description: 'Назва події' })
  @IsString({ message: 'Назва події має бути рядком' })
  @IsNotEmpty({ message: 'Назва події є обов’язковою' })
  readonly title: string;

  @Field(() => String, { nullable: true, description: 'Опис події' })
  @IsOptional()
  @IsString({ message: 'Опис події має бути рядком' })
  readonly description?: string;

  @Field(() => Date, { description: 'Дата початку' })
  @Type(() => Date)
  @IsDate({ message: 'Недійсний формат дати початку' })
  @IsNotEmpty({ message: 'Дата початку є обов’язковою' })
  readonly startDateTime: Date;

  @Field(() => Date, { description: 'Дата закінчення' })
  @Type(() => Date)
  @IsDate({ message: 'Недійсний формат дати закінчення' })
  @IsNotEmpty({ message: 'Дата закінчення є обов’язковою' })
  readonly endDateTime: Date;

  @Field(() => String, { nullable: true, description: 'Місце проведення' })
  @IsOptional()
  @IsString({ message: 'Місце проведення має бути рядком' })
  readonly location?: string;

  @Field(() => EventType, { nullable: true, description: 'Тип події' })
  @IsOptional()
  @IsEnum(EventType, { message: 'Недійсний тип події' })
  readonly eventType?: EventType;

  @Field(() => [String], { nullable: true, description: 'Список учасників' })
  @IsOptional()
  @IsArray({ message: 'Учасники мають бути масивом' })
  @IsString({ each: true, message: 'ім’я учасника має бути рядком' })
  readonly participants?: string[];
}
