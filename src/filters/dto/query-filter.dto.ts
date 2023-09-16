import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { FilterStatus, FilterType } from '../schemas/filter.schema';

export class QueryFilterDto {
  @ApiPropertyOptional({
    description: 'Filter type',
    example: FilterType.SOFTWARE
  })
  @IsString()
  @IsOptional()
  readonly type: FilterType;

  @ApiPropertyOptional({
    description: 'Filter status',
    example: FilterStatus.DENY
  })
  @IsString()
  @IsOptional()
  readonly status: FilterStatus;
}
