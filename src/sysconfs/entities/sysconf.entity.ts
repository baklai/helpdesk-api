import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SysConf', { description: 'Системні налаштування' })
export class SysConfEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Ключ налаштування' })
  readonly key: string;

  @Field(() => String, { nullable: true, description: 'Значення конфігурації' })
  readonly value?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}
