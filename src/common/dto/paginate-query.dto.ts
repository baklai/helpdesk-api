import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsObject, IsOptional, Max, Min } from 'class-validator';

export class PaginateQueryDto {
  @ApiPropertyOptional({ description: 'Number of items per page', example: 5 })
  @Min(0)
  @Max(50)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly limit: number;

  @ApiPropertyOptional({ description: 'Number of items to skip', example: 0 })
  @Min(0)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly offset: number;

  @ApiPropertyOptional({
    description: 'Sorting criteria (e.g., sort[field]=asc)'
  })
  @IsObject()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly sort: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Filtering criteria (e.g., filters[field]=value)'
  })
  @IsObject()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly filters: Record<string, any>;
}
