import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { FilterStatus, FilterType } from '../schemas/filter.schema';

export class QueryFilterDto {
  @ApiPropertyOptional({
    description: 'Тип фільтра',
    example: FilterType.SOFTWARE
  })
  @IsString()
  @IsOptional()
  readonly type: FilterType;

  @ApiPropertyOptional({
    description: 'Статус фільтра',
    example: FilterStatus.DENY
  })
  @IsString()
  @IsOptional()
  readonly status: FilterStatus;
}
