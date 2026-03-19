import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення організації' })
export class CreateOrganizationInput {
  @Field(() => String, { description: 'Назва організації' })
  @IsString({ message: 'Назва організації має бути рядком' })
  @IsNotEmpty({ message: 'Назва організації є обов’язковою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Юридична або фактична адреса' })
  @IsOptional()
  @IsString({ message: 'Адреса організації має бути рядком' })
  readonly address?: string;

  @Field(() => String, { nullable: true, description: 'Додаткова інформація про організацію' })
  @IsOptional()
  @IsString({ message: 'Опис організації має бути рядком' })
  readonly description?: string;
}
