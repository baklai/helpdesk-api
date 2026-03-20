import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType({ description: 'Створення звіту' })
export class CreateReportInput {
  @Field(() => String, { description: 'Назва звіту' })
  @IsString({ message: 'Назва звіту має бути рядком' })
  @IsNotEmpty({ message: 'Назва звіту є обов’язковою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Опис звіту' })
  @IsOptional()
  @IsString({ message: 'Опис має бути рядком' })
  readonly description?: string;

  @Field(() => ID, { nullable: true, description: 'Профіль користувача' })
  @IsOptional()
  @IsMongoId({ message: 'Недійсний ідентифікатор профілю' })
  readonly creator?: string;

  @Field(() => String, { description: 'Назва колекції' })
  @IsString({ message: 'Назва колекції має бути рядком' })
  @IsNotEmpty({ message: 'Колекція є обов’язковою' })
  readonly datacollection: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Обрані поля: { "field": "Заголовок колонки" }'
  })
  @IsOptional()
  readonly fields?: Record<string, string>;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Правила сортування: { "field": 1 } або { "field": -1 }'
  })
  @IsOptional()
  readonly sorts?: Record<string, number>;

  @Field(() => GraphQLJSON, { nullable: true, description: 'Умови фільтрації' })
  @IsOptional()
  readonly filters?: Record<string, any>;
}
