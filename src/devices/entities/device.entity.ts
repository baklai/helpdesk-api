import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Device', { description: 'Пристрій' })
export class DeviceEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва пристрою' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Додатковий опис пристрою' })
  readonly description?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}
