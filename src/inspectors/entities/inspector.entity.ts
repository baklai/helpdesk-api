import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { PaginatedBase, PaginatedDocs } from 'src/common/types/paginated.type';

@ObjectType('Inspector', { description: 'ПК SysInspector' })
export class InspectorEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => String, { description: 'IP-адреса' })
  readonly ipaddress: string;

  @Field(() => GraphQLJSON, { nullable: true, description: 'Материнська плата' })
  readonly baseboard?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true, description: 'BIOS' })
  readonly bios?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true, description: 'Операційна система' })
  readonly os?: Record<string, any>;

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Процесор (CPU)' })
  readonly cpu?: any[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Дискові накопичувачі' })
  readonly diskdrive?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: "Модулі оперативної пам'яті" })
  readonly memorychip?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Мережеві адаптери' })
  readonly netadapter: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Відео адаптери' })
  readonly videoadapter?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Дісплеї' })
  readonly display?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Аудіо адаптори' })
  readonly sound?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Принтери' })
  readonly printer?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Встановлене ПЗ' })
  readonly product?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Оновлення ОС' })
  readonly fixupdate?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Спільні ресурси' })
  readonly share?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Облікові записи' })
  readonly useraccount?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Групи облікових записів' })
  readonly usergroup?: Record<string, any>[];

  @Field(() => [String], { nullable: true, description: 'Список адміністраторів' })
  readonly useradmin?: string[];

  @Field(() => Boolean, { nullable: true, description: 'Наявність запису IP-адреси' })
  readonly isIpaddress?: boolean;

  @Field(() => String, { nullable: true, description: 'Назва материнської плати' })
  readonly baseboardName?: string;

  @Field(() => String, { nullable: true, description: 'Назва CPU' })
  readonly cpuName?: string;

  @Field(() => GraphQLJSON, { nullable: true, description: 'Інформація про ОС' })
  readonly system?: Record<string, any>;

  @Field(() => Number, { nullable: true, description: 'Розмір HDD' })
  readonly hddSize?: number;

  @Field(() => Number, { nullable: true, description: 'Розмір RAM' })
  readonly ramSize?: number;

  @Field(() => Number, { nullable: true, description: 'Кількість встановлених оновлень' })
  readonly countFixupdate?: number;

  @Field(() => Number, { nullable: true, description: 'Кількість облікових записів' })
  readonly countUseraccount?: number;

  @Field(() => Number, { nullable: true, description: 'Кількість встаповленого ПЗ' })
  readonly countProduct?: number;

  @Field(() => Number, { nullable: true, description: 'Кількість спільних ресурсів' })
  readonly countShare?: number;

  @Field(() => Date, { nullable: true, description: 'Дата автоматичного видалення 365 днів' })
  readonly expiresAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}

@ObjectType()
export class InspectorPaginated extends PaginatedBase implements PaginatedDocs<InspectorEntity> {
  @Field(() => [InspectorEntity], { description: 'Список документів' })
  docs: InspectorEntity[];
}
