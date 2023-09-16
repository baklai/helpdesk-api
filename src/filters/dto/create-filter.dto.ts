import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { FilterStatus, FilterType } from '../schemas/filter.schema';

export class CreateFilterDto {
  @ApiProperty({
    description: 'The regex of the filter',
    example: 'Warcraft II: Tides of Darkness'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly regex: string;

  @ApiProperty({
    enum: FilterType,
    enumName: 'FilterType',
    example: FilterType.SOFTWARE,
    description: 'The type of the filter'
  })
  @IsEnum(FilterType, { message: 'Invalid filter type' })
  @IsDefined()
  @IsNotEmpty()
  readonly type: FilterType;

  @ApiProperty({
    enum: FilterStatus,
    enumName: 'FilterStatus',
    example: FilterStatus.DENY,
    description: 'The status of the filter'
  })
  @IsEnum(FilterStatus, { message: 'Invalid filter status' })
  @IsDefined()
  @IsNotEmpty()
  readonly status: FilterStatus;

  @ApiPropertyOptional({
    description: 'A description about the filter',
    example: 'This software is unwanted.'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;
}
