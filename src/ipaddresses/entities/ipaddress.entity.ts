import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InternetStatusType } from 'src/common/enums/status.enum';

import type { PaginatedDocs } from 'src/common/types/paginated.type';
import { PaginatedBase } from 'src/common/types/paginated.type';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { DeviceEntity } from 'src/devices/entities/device.entity';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { SubdivisionEntity } from 'src/subdivisions/entities/subdivision.entity';

@ObjectType('CIDR', { description: 'Параметри мережевої маски' })
export class CIDREntity {
  @Field(() => Number, { description: 'Префікс (напр. 24)' })
  @IsNumber({}, { message: 'Префікс має бути числом' })
  readonly value: number;

  @Field(() => String, { description: 'Маска (напр. 255.255.255.0)' })
  @IsString({ message: 'Маска має бути рядком' })
  readonly mask: string;
}

@ObjectType('Internet', { description: 'Доступ до мережі Інтернет' })
export class InternetEntity {
  @Field(() => String, { nullable: true, description: 'Номер розпорядження' })
  @IsOptional()
  @IsString({ message: 'Номер розпорядження має бути рядком' })
  readonly reqnum?: string | null;

  @Field(() => InternetStatusType, { nullable: true, description: 'Статус доступу' })
  @IsOptional()
  @IsEnum(InternetStatusType, { message: 'Недійсний тип статусу' })
  readonly status?: InternetStatusType;

  @Field(() => String, { nullable: true, description: 'Примітка' })
  @IsOptional()
  @IsString({ message: 'Примітка має бути рядком' })
  readonly comment?: string;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  @IsOptional()
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  @IsOptional()
  readonly updatedAt?: Date;
}

@ObjectType('Ipaddress', { description: 'Мережева IP-адреса' })
export class IpaddressEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'IP-адреса' })
  readonly ipaddress: string;

  @Field(() => String, { nullable: true, description: 'Маска підмережі' })
  readonly mask: string;

  @Field(() => String, { nullable: true, description: 'Шлюз за замовчуванням' })
  readonly gateway: string;

  @Field(() => Number, { description: 'Числовий індекс IP' })
  readonly indexip: number;

  @Field(() => CIDREntity, { description: 'Параметри CIDR' })
  readonly cidr: CIDREntity;

  @Field(() => InternetEntity, { nullable: true, description: 'Доступ до Інтернету' })
  readonly internet?: InternetEntity;

  @Field(() => String, { nullable: true, description: 'Номер запиту' })
  readonly reqnum?: string;

  @Field(() => String, { nullable: true, description: "Призвіще та ім'я" })
  readonly fullname: string;

  @Field(() => String, { nullable: true, description: 'Номер телефону' })
  readonly phone: string;

  @Field(() => String, { nullable: true, description: 'Електронна пошта' })
  readonly email?: string;

  @Field(() => String, { nullable: true, description: 'Інвентарний номер' })
  readonly inventory?: string;

  @Field(() => String, { nullable: true, description: 'Автовідповідь' })
  readonly autoanswer?: string;

  @Field(() => String, { nullable: true, description: 'Коментар' })
  readonly comment?: string;

  @Field(() => DeviceEntity, { nullable: true, description: 'Пристрій' })
  readonly device?: DeviceEntity;

  @Field(() => LocationEntity, { nullable: true, description: 'Локація' })
  readonly location?: LocationEntity;

  @Field(() => OrganizationEntity, { nullable: true, description: 'Організація' })
  readonly organization?: OrganizationEntity;

  @Field(() => SubdivisionEntity, { nullable: true, description: 'Підрозділ' })
  readonly subdivision?: SubdivisionEntity;

  @Field(() => DepartmentEntity, { nullable: true, description: 'Відділ' })
  readonly department?: DepartmentEntity;

  @Field(() => PositionEntity, { nullable: true, description: 'Посада' })
  readonly position?: PositionEntity;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class IpaddressPaginated extends PaginatedBase implements PaginatedDocs<IpaddressEntity> {
  @Field(() => [IpaddressEntity], { description: 'Список IP-адрес' })
  docs: IpaddressEntity[];
}
