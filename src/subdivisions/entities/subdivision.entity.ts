import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';

@ObjectType('Subdivision', { description: 'Підрозділ' })
export class SubdivisionEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { nullable: true, description: 'Внутрішній код підрозділу' })
  readonly code?: string;

  @Field(() => String, { description: 'Назва підрозділу' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Фактична адреса' })
  readonly address?: string;

  @Field(() => String, { nullable: true, description: 'Додаткова інформація' })
  readonly description?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class SubdivisionPaginated
  extends PaginatedBase
  implements PaginatedDocs<SubdivisionEntity>
{
  @Field(() => [SubdivisionEntity], { description: 'Список підрозділів' })
  docs: SubdivisionEntity[];
}
