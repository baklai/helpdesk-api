import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'Створення каналу' })
export class CreateChannelInput {
  @Field(() => String, { description: 'Місцезнаходження з' })
  @IsString({ message: 'Місцезнаходження повинно бути рядком' })
  @IsNotEmpty({ message: 'Місцезнаходження є обов’язковим' })
  readonly locationFrom: string;

  @Field(() => String, { description: 'Пристрій від' })
  @IsString({ message: 'Назва пристрою повинна бути рядком' })
  @IsNotEmpty({ message: 'Назва пристрою є обов’язковою' })
  readonly deviceFrom: string;

  @Field(() => String, { description: 'Місцезнаходження до' })
  @IsString({ message: 'Місцезнаходження повинно бути рядком' })
  @IsNotEmpty({ message: 'Місцезнаходження є обов’язковим' })
  readonly locationTo: string;

  @Field(() => String, { description: 'Пристрій до' })
  @IsString({ message: 'Назва пристрою повинна бути рядком' })
  @IsNotEmpty({ message: 'Назва пристрою є обов’язковою' })
  readonly deviceTo: string;

  @Field(() => String, { description: 'Рівень каналу' })
  @IsString({ message: 'Рівень каналу повинна бути рядком' })
  @IsNotEmpty({ message: 'Рівень каналу є обов’язковою' })
  readonly level: string;

  @Field(() => String, { description: 'Тип каналу' })
  @IsString({ message: 'Тип каналу повинна бути рядком' })
  @IsNotEmpty({ message: 'Тип каналу є обов’язковою' })
  readonly channelType: string;

  @Field(() => String, { description: 'Швидкість каналу' })
  @IsString({ message: 'Швидкість каналу повинна бути рядком' })
  @IsNotEmpty({ message: 'Швидкість каналу є обов’язковою' })
  readonly speed: string;

  @Field(() => String, { description: 'Стан каналу' })
  @IsString({ message: 'Стан каналу повинна бути рядком' })
  @IsNotEmpty({ message: 'Стан каналу є обов’язковою' })
  readonly status: string;

  @Field(() => String, { description: 'Оператор каналу' })
  @IsString({ message: 'Оператор каналу повинна бути рядком' })
  @IsNotEmpty({ message: 'Оператор каналу є обов’язковою' })
  readonly operator: string;

  @Field(() => String, { description: 'Склад каналу' })
  @IsString({ message: 'Склад каналу повинна бути рядком' })
  @IsNotEmpty({ message: 'Склад каналу є обов’язковим' })
  readonly composition: string;
}
