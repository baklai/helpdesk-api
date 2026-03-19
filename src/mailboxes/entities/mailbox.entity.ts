import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MailboxStatusType } from 'src/common/enums/status.enum';
import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { SubdivisionEntity } from 'src/subdivisions/entities/subdivision.entity';

@ObjectType('Mailbox', { description: 'Поштові скриньки' })
export class MailboxEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'Номер розпорядження/заявки' })
  readonly reqnum: string;

  @Field(() => String, { description: 'Електронна адреса' })
  readonly email: string;

  @Field(() => String, { nullable: true, description: 'Прізвище та ім’я власника' })
  readonly fullname: string;

  @Field(() => String, { nullable: true, description: 'Контактний телефон' })
  readonly phone: string;

  @Field(() => MailboxStatusType, { nullable: true, description: 'Статус поштової скриньки' })
  readonly status: MailboxStatusType;

  @Field(() => String, { nullable: true, description: 'Коментар' })
  readonly comment?: string;

  @Field(() => OrganizationEntity, { nullable: true, description: 'Організація' })
  readonly organization: OrganizationEntity;

  @Field(() => SubdivisionEntity, { nullable: true, description: 'Підрозділ' })
  readonly subdivision: SubdivisionEntity;

  @Field(() => DepartmentEntity, { nullable: true, description: 'Відділ' })
  readonly department: DepartmentEntity;

  @Field(() => PositionEntity, { nullable: true, description: 'Посада' })
  readonly position: PositionEntity;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class MailboxPaginated extends PaginatedBase implements PaginatedDocs<MailboxEntity> {
  @Field(() => [MailboxEntity], { description: 'Список документів' })
  docs: MailboxEntity[];
}
