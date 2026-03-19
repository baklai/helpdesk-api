import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EventType } from 'src/common/enums/event.enum';

@ObjectType('Event', { description: 'Подія' })
export class EventEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Назва події' })
  readonly title: string;

  @Field(() => String, { nullable: true, description: 'Опис події' })
  readonly description?: string;

  @Field(() => Date, { description: 'Дата початку' })
  readonly startDateTime: Date;

  @Field(() => Date, { description: 'Дата закінчення' })
  readonly endDateTime: Date;

  @Field(() => String, { nullable: true, description: 'Місце проведення' })
  readonly location?: string;

  @Field(() => EventType, { nullable: true, description: 'Тип події' })
  readonly eventType?: EventType;

  @Field(() => [String], { nullable: true, description: 'Список учасників' })
  readonly participants?: string[];

  @Field(() => Date, { nullable: true, description: 'Дата автоматичного видалення 365 днів' })
  readonly expiresAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}
