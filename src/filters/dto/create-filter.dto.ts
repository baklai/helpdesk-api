import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { FilterStatus, FilterType } from '../schemas/filter.schema';

export class CreateFilterDto {
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
}
