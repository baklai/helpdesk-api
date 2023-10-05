import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { FilterType, FilterStatus } from '../schemas/filter.schema';

export class FilterDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The regex of the filter',
    example: 'Warcraft II: Tides of Darkness'
  })
  @IsString()
  readonly regex: string;

  @ApiProperty({
    enum: FilterType,
    enumName: 'FilterType',
    example: FilterType.SOFTWARE,
    description: 'The type of the filter'
  })
  @IsEnum(FilterType, { message: 'Invalid filter type' })
  readonly type: FilterType;

  @ApiProperty({
    enum: FilterStatus,
    enumName: 'FilterStatus',
    example: FilterStatus.DENY,
    description: 'The status of the filter'
  })
  @IsEnum(FilterStatus, { message: 'Invalid filter status' })
  readonly status: FilterStatus;

  @ApiPropertyOptional({
    description: 'A description about the filter',
    example: 'This software is unwanted.'
  })
  @IsString()
  @IsOptional()
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
