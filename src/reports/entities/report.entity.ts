import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { UserShortEntity } from 'src/users/entities/user.entity';

@ObjectType('Report', { description: 'Шаблон динамічного звіту' })
export class ReportEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва звіту' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Опис звіту' })
  readonly description?: string;

  @Field(() => UserShortEntity, { nullable: true, description: 'Автор шаблону' })
  readonly creator?: UserShortEntity;

  @Field(() => String, { description: 'Назва колекції для аналізу' })
  readonly datacollection: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Обрані поля: { "dbField": "Заголовок колонки" }'
  })
  readonly fields?: Record<string, string>;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Правила сортування: { "field": 1 | -1 }'
  })
  readonly sorts?: Record<string, number>;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: "Умови фільтрації (MongoDB-сумісний об'єкт)"
  })
  readonly filters?: Record<string, any>;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}
