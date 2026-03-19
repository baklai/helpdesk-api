import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';
import { UserShortEntity } from 'src/users/entities/user.entity';

@ObjectType('SysLog', { description: 'Системний лог' })
export class SysLogEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'IP-адреса або хост запиту' })
  readonly ipaddress: string;

  @Field(() => UserShortEntity, { nullable: true, description: 'Ідентифікатор користувача' })
  readonly user?: UserShortEntity;

  @Field(() => String, { description: 'Метод "QUERY" чи "MUTATION"' })
  readonly method: string;

  @Field(() => String, { description: 'Назва метода' })
  readonly methodName: string;

  @Field(() => Int, { description: 'Статус відповіді' })
  readonly status: number;

  @Field(() => String, { description: 'Дані про клієнт' })
  readonly userAgent: string;

  @Field(() => String, { nullable: true, description: 'Інформація про помилку' })
  readonly error?: string;

  @Field(() => Date, { nullable: true, description: 'Дата автоматичного видалення 180 днів' })
  readonly expiresAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class SysLogPaginated extends PaginatedBase implements PaginatedDocs<SysLogEntity> {
  @Field(() => [SysLogEntity], { description: 'Список системних логів' })
  docs: SysLogEntity[];
}
