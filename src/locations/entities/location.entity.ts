import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginatedBase, PaginatedDocs } from 'src/common/types/paginated.type';

@ObjectType('Location', { description: 'Локація' })
export class LocationEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва локації' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Регіон локації' })
  readonly region?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class LocationPaginated extends PaginatedBase implements PaginatedDocs<LocationEntity> {
  @Field(() => [LocationEntity], { description: 'Список локацій' })
  docs: LocationEntity[];
}
