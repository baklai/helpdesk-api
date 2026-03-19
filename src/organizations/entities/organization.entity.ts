import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';

@ObjectType('Organization', { description: 'Організація' })
export class OrganizationEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва організації' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Юридична/фактична адреса' })
  readonly address?: string;

  @Field(() => String, { nullable: true, description: 'Додатковий опис' })
  readonly description?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class OrganizationPaginated
  extends PaginatedBase
  implements PaginatedDocs<OrganizationEntity>
{
  @Field(() => [OrganizationEntity], { description: 'Список організацій' })
  docs: OrganizationEntity[];
}
