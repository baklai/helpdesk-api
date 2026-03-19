import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';

@ObjectType('Position', { description: 'Посада' })
export class PositionEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва посади' })
  readonly name: string;

  @Field(() => String, { description: 'Опис посади' })
  readonly description: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class PositionPaginated extends PaginatedBase implements PaginatedDocs<PositionEntity> {
  @Field(() => [PositionEntity], { description: 'Список посад' })
  docs: PositionEntity[];
}
