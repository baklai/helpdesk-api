import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';

@ObjectType('Department', { description: 'Відділ' })
export class DepartmentEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва відділу' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Опис відділу' })
  readonly description?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class DepartmentPaginated extends PaginatedBase implements PaginatedDocs<DepartmentEntity> {
  @Field(() => [DepartmentEntity], { description: 'Список відділів' })
  docs: DepartmentEntity[];
}
