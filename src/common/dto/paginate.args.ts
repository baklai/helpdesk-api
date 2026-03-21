import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, IsObject, IsOptional, Max, Min } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

export const PAGINATE_MAX_LIMIT = 50;

const transformEmptyToUndefined = ({ value }: { value: unknown }): unknown => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
  ) {
    return undefined;
  }
  return value;
};

@ArgsType()
export class PaginateArgs {
  @Field(() => Int, {
    description: 'Кількість записів на сторінці',
    defaultValue: 5
  })
  @Min(0, { message: 'Значення "limit" не може бути менше 0.' })
  @Max(PAGINATE_MAX_LIMIT, {
    message: `Значення "limit" не може перевищувати ${PAGINATE_MAX_LIMIT}.`
  })
  @IsInt({ message: 'Значення "limit" повинно бути цілим числом.' })
  @IsOptional()
  readonly limit?: number = 5;

  @Field(() => Int, {
    description: 'Кількість записів, які потрібно пропустити',
    defaultValue: 0
  })
  @Min(0, { message: 'Значення "offset" не може бути менше 0.' })
  @IsInt({ message: 'Значення "offset" повинно бути цілим числом.' })
  @IsOptional()
  readonly offset?: number = 0;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Обʼєкт сортування'
  })
  @IsObject({ message: 'Поле "sort" повинно бути обʼєктом.' })
  @IsOptional()
  @Transform(transformEmptyToUndefined)
  readonly sort?: Record<string, any>;

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Обʼєкт фільтрів'
  })
  @IsObject({ message: 'Поле "filters" повинно бути обʼєктом.' })
  @IsOptional()
  @Transform(transformEmptyToUndefined)
  readonly filters?: Record<string, any>;
}
