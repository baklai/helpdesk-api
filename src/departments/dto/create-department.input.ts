import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення відділу' })
export class CreateDepartmentInput {
  @Field(() => String, { description: 'Назва відділу' })
  @IsString({ message: 'Назва відділу повинна бути рядком' })
  @IsNotEmpty({ message: 'Назва відділу є обов’язковою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Опис відділу' })
  @IsOptional()
  @IsString({ message: 'Опис відділу має бути рядком' })
  readonly description?: string;
}
