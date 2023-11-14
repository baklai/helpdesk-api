import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsEnum, IsOptional, IsDate } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

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
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The regex of the filter',
    example: 'Warcraft II: Tides of Darkness'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly regex: string;

  @ApiProperty({
    enum: FilterType,
    enumName: 'FilterType',
    example: FilterType.SOFTWARE,
    description: 'The type of the filter'
  })
  @IsEnum(FilterType, { message: 'Invalid filter type' })
  @Prop({ type: String, required: true, enum: Object.values(FilterType), trim: true })
  readonly type: FilterType;

  @ApiProperty({
    enum: FilterStatus,
    enumName: 'FilterStatus',
    example: FilterStatus.DENY,
    description: 'The status of the filter'
  })
  @IsEnum(FilterStatus, { message: 'Invalid filter status' })
  @Prop({ type: String, required: true, enum: Object.values(FilterStatus), trim: true })
  readonly status: FilterStatus;

  @ApiPropertyOptional({
    description: 'A description about the filter',
    example: 'This software is unwanted.'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export type SysfilterDocument = HydratedDocument<Filter>;

export const FilterSchema = SchemaFactory.createForClass(Filter);
