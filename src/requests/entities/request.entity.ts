import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RequestStatusType } from 'src/common/enums/status.enum';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { SubdivisionEntity } from 'src/subdivisions/entities/subdivision.entity';
import { UserShortEntity } from 'src/users/entities/user.entity';

@ObjectType('Request', { description: 'Заявка техпідтримки' })
export class RequestEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { nullable: true, description: 'Прізвище та ім’я заявника' })
  readonly fullname: string;

  @Field(() => String, { nullable: true, description: 'Номер телефону' })
  readonly phone: string;

  @Field(() => String, { nullable: true, description: 'IP-адреса' })
  readonly ipaddress: string;

  @Field(() => String, { nullable: true, description: 'Номер вхідного запиту' })
  readonly reqnum: string;

  @Field(() => String, { nullable: true, description: 'Текст звернення' })
  readonly request: string;

  @Field(() => String, { nullable: true, description: 'Коментар спеціаліста' })
  readonly comment: string;

  @Field(() => String, { nullable: true, description: 'Технічний висновок' })
  readonly conclusion: string;

  @Field(() => UserShortEntity, { nullable: true, description: 'Профіль користувача' })
  readonly opened: UserShortEntity;

  @Field(() => UserShortEntity, { nullable: true, description: 'Профіль користувача' })
  readonly closed: UserShortEntity;

  @Field(() => RequestStatusType, { nullable: true, description: 'Статус заявки' })
  readonly status: RequestStatusType;

  @Field(() => PositionEntity, { nullable: true, description: 'Посада' })
  readonly position: PositionEntity;

  @Field(() => LocationEntity, { nullable: true, description: 'Локація' })
  readonly location: LocationEntity;

  @Field(() => OrganizationEntity, { nullable: true, description: 'Організація' })
  readonly organization: OrganizationEntity;

  @Field(() => SubdivisionEntity, { nullable: true, description: 'Підрозділ' })
  readonly subdivision: SubdivisionEntity;

  @Field(() => DepartmentEntity, { nullable: true, description: 'Відділ' })
  readonly department: DepartmentEntity;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class RequestPaginated extends PaginatedBase implements PaginatedDocs<RequestEntity> {
  @Field(() => [RequestEntity], { description: 'Список заявок техпідтримки' })
  docs: RequestEntity[];
}
