import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true, description: 'Базова структура пагінованих даних' })
export abstract class PaginatedBase {
  @Field(() => Int, { description: 'Загальна кількість знайдених документів' })
  totalDocs: number;

  @Field(() => Int, { description: 'Поточний ліміт записів на сторінку' })
  limit: number;

  @Field(() => Int, { description: 'Кількість пропущених записів від початку' })
  offset?: number;

  @Field(() => Int, { description: 'Загальна кількість доступних сторінок' })
  totalPages: number;

  @Field(() => Int, { nullable: true, description: 'Порядковий номер поточної сторінки' })
  page?: number;

  @Field(() => Int, { nullable: true, description: 'Номер попередньої сторінки' })
  prevPage?: number | null;

  @Field(() => Int, { nullable: true, description: 'Номер наступної сторінки' })
  nextPage?: number | null;

  @Field(() => Boolean, { nullable: true, description: 'Чи доступна попередня сторінка' })
  hasPrevPage?: boolean;

  @Field(() => Boolean, { nullable: true, description: 'Чи доступна наступна сторінка' })
  hasNextPage?: boolean;

  @Field(() => Int, {
    nullable: true,
    description: 'Лічильник порядкового номера першого документа на сторінці'
  })
  pagingCounter?: number;
}

/**
 * Допоміжний тип для опису структури пагінованого результату з документами
 */
export type PaginatedDocs<T> = {
  docs: T[];
};
