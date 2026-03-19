import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginatedBase, PaginatedDocs } from 'src/common/types/paginated.type';

@ObjectType('Channel', { description: 'Канал звязку' })
export class ChannelEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Місцезнаходження з' })
  readonly locationFrom: string;

  @Field(() => String, { description: 'Пристрій від' })
  readonly deviceFrom: string;

  @Field(() => String, { description: 'Місцезнаходження до' })
  readonly locationTo: string;

  @Field(() => String, { description: 'Пристрій до' })
  readonly deviceTo: string;

  @Field(() => String, { description: 'Рівень каналу' })
  readonly level: string;

  @Field(() => String, { description: 'Тип каналу' })
  readonly channelType: string;

  @Field(() => String, { description: 'Швидкість каналу' })
  readonly speed: string;

  @Field(() => String, { description: 'Стан каналу' })
  readonly status: string;

  @Field(() => String, { description: 'Оператор каналу' })
  readonly operator: string;

  @Field(() => String, { description: 'Склад каналу' })
  readonly composition: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class ChannelPaginated extends PaginatedBase implements PaginatedDocs<ChannelEntity> {
  @Field(() => [ChannelEntity], { description: 'Список каналів' })
  docs: ChannelEntity[];
}
