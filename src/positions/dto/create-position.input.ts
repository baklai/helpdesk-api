import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'Створення посади' })
export class CreatePositionInput {
  @Field(() => String, { description: 'Назва посади' })
  @IsString({ message: 'Назва посади має бути рядком' })
  @IsNotEmpty({ message: 'Назва посади є обов’язковою' })
  readonly name: string;
}
