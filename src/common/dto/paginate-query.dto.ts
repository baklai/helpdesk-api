import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsObject, IsOptional, Max, Min } from 'class-validator';

function convertValuesToNumber(val: Record<string, any>) {
  const obj = { ...val };
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        obj[key] = numericValue;
      }
    }
  }
  return obj;
}

export class PaginateQueryDto {
  @ApiProperty({ description: 'Number of items per page', example: 5, type: Number })
  @Min(0)
  @Max(50)
  @IsInt()
  readonly limit: number;

  @ApiProperty({ description: 'Number of items to skip', example: 0, type: Number })
  @Min(0)
  @IsInt()
  readonly offset: number;

  @ApiPropertyOptional({
    description: 'Sorting criteria (e.g., sort[field]=asc)',
    type: String
  })
  @IsObject()
  @IsOptional()
  @Transform(({ value }) => (value ? convertValuesToNumber(value) : {}))
  readonly sort: Record<number | string, any>;

  @ApiPropertyOptional({
    description: 'Filtering criteria (e.g., filters[field]=value)',
    type: String
  })
  @IsObject()
  @IsOptional()
  readonly filters: Record<string, any>;
}
