import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { FilterStatus, FilterType } from '../schemas/filter.schema';

export class CreateFilterDto {
  @ApiProperty({
    description: 'Регулярний вираз фільтра',
    example: 'Warcraft II: Tides of Darkness'
  })
  @IsString()
  readonly regex: string;

  @ApiProperty({
    enum: FilterType,
    enumName: 'FilterType',
    example: FilterType.SOFTWARE,
    description: 'Тип фільтра'
  })
  @IsEnum(FilterType, { message: 'Недійсний тип фільтра' })
  readonly type: FilterType;

  @ApiProperty({
    enum: FilterStatus,
    enumName: 'FilterStatus',
    example: FilterStatus.DENY,
    description: 'Статус фільтра'
  })
  @IsEnum(FilterStatus, { message: 'Недійсний статус фільтра' })
  readonly status: FilterStatus;

  @ApiPropertyOptional({
    description: 'Опис фільтра',
    example: 'Це програмне забезпечення небажане.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
