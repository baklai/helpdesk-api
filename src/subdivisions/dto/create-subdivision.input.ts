import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення підрозділу' })
export class CreateSubdivisionInput {
  @Field(() => String, { nullable: true, description: 'Внутрішній код підрозділу' })
  @IsOptional()
  @IsString({ message: 'Код підрозділу має бути рядком' })
  readonly code?: string;

  @Field(() => String, { description: 'Назва підрозділу' })
  @IsString({ message: 'Назва підрозділу має бути рядком' })
  @IsNotEmpty({ message: 'Назва підрозділу є обов’язковою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Фактична адреса підрозділу' })
  @IsOptional()
  @IsString({ message: 'Адреса підрозділу має бути рядком' })
  readonly address?: string;

  @Field(() => String, { nullable: true, description: 'Додатковий опис або примітки' })
  @IsOptional()
  @IsString({ message: 'Опис підрозділу має бути рядком' })
  readonly description?: string;
}
