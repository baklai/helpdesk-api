import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginateQueryDto {
  @ApiProperty({ description: 'Number of items per page', example: 5 })
  @Min(0)
  @Max(50)
  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({ description: 'Number of items to skip', example: 0 })
  @Min(0)
  @IsInt()
  @IsOptional()
  readonly offset?: number;

  @ApiProperty({
    description: 'Sorting criteria (e.g., sort[field]=asc)'
  })
  @IsObject()
  @IsOptional()
  readonly sort?: Record<string, any>;

  @ApiProperty({
    description: 'Filtering criteria (e.g., filters[field]=value)'
  })
  @IsObject()
  @IsOptional()
  readonly filters?: Record<string, any>;
}
