import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення пристрою' })
export class CreateDeviceInput {
  @Field(() => String, { description: 'Назва пристрою' })
  @IsString({ message: 'Назва повинна бути рядком' })
  @IsNotEmpty({ message: 'Назва пристрою є обов’язковою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Додатковий опис пристрою' })
  @IsOptional()
  @IsString({ message: 'Опис має бути рядком' })
  readonly description?: string;
}
