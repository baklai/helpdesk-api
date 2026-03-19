import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Allow, IsArray, IsOptional } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType({ description: 'ПК SysInspector' })
export class CreateInspectorInput {
  @Field(() => GraphQLJSON, { nullable: true, description: 'Материнська плата' })
  @IsOptional()
  baseboard?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true, description: 'BIOS' })
  @IsOptional()
  bios?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true, description: 'Операційна система' })
  @IsOptional()
  os?: Record<string, any>;

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Процесори' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  cpu?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Дискові накопичувачі' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  diskdrive?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: "Модулі пам'яті" })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  memorychip?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Мережеві адаптери' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  netadapter?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Відео адаптери' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  videoadapter?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Дісплеї' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  display?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Аудіо адаптори' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  sound?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Принтери' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  printer?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Встановлене ПЗ' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  product?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Оновлення ОС' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  fixupdate?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Спільні ресурси' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  share?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Облікові записи' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  useraccount?: Record<string, any>[];

  @Field(() => [GraphQLJSON], { nullable: true, description: 'Групи облікових записів' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => Object)
  usergroup?: Record<string, any>[];

  @Field(() => [String], { nullable: true, description: 'Список адміністраторів' })
  @IsOptional()
  @IsArray()
  @Allow()
  @Type(() => String)
  useradmin?: string[];
}
