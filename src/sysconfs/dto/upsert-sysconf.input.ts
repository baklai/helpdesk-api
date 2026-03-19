import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення налаштування' })
export class UpsertSysConfInput {
  @Field(() => String, { description: 'Унікальний ключ' })
  @IsString({ message: 'Ключ має бути рядком' })
  @IsNotEmpty({ message: 'Ключ є обов’язковим' })
  readonly key: string;

  @Field(() => String, { nullable: true, description: 'Значення налаштування' })
  @IsOptional()
  @IsString({ message: 'Значення має бути рядком' })
  readonly value?: string;
}
