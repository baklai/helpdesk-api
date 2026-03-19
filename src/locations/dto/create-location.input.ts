import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення локації' })
export class CreateLocationInput {
  @Field(() => String, { description: 'Назва локації' })
  @IsString({ message: 'Назва локації повинна бути рядком' })
  @IsNotEmpty({ message: 'Назва локації є обов’язковою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Регіон локації' })
  @IsOptional()
  @IsString({ message: 'Регіон локації повинен бути рядком' })
  readonly region?: string;
}
