import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsEnum, IsOptional, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export enum FilterType {
  ACCOUNT = 'account',
  SOFTWARE = 'software',
  SHARE = 'share'
}

export enum FilterStatus {
  ALLOW = 'allow',
  DENY = 'deny'
}

@Schema()
export class Filter {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'Регулярний вираз фільтра',
    example: 'Warcraft II: Tides of Darkness'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly regex: string;

  @ApiProperty({
    enum: FilterType,
    enumName: 'FilterType',
    example: FilterType.SOFTWARE,
    description: 'Тип фільтра'
  })
  @IsEnum(FilterType, { message: 'Недійсний тип фільтра' })
  @Prop({ type: String, required: true, enum: Object.values(FilterType), trim: true })
  readonly type: FilterType;

  @ApiProperty({
    enum: FilterStatus,
    enumName: 'FilterStatus',
    example: FilterStatus.DENY,
    description: 'Статус фільтра'
  })
  @IsEnum(FilterStatus, { message: 'Недійсний статус фільтра' })
  @Prop({ type: String, required: true, enum: Object.values(FilterStatus), trim: true })
  readonly status: FilterStatus;

  @ApiPropertyOptional({
    description: 'Опис фільтра',
    example: 'Це програмне забезпечення небажане.'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiPropertyOptional({
    description: 'Дата створення запису',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'Дата оновлення запису',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export type SysfilterDocument = HydratedDocument<Filter>;

export const FilterSchema = SchemaFactory.createForClass(Filter);
