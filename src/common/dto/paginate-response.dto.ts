import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PaginateResponseDto {
  @ApiPropertyOptional({
    description: 'Total number of documents in collection that match a query',
    example: 100
  })
  @IsNumber()
  @IsOptional()
  totalDocs: number;

  @ApiPropertyOptional({ description: 'Limit that was used', example: 1 })
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({
    description: 'Only if specified or default page/offset values were used',
    example: 10
  })
  @IsNumber()
  @IsOptional()
  offset: number;

  @ApiPropertyOptional({ description: 'Availability of prev page', example: true })
  @IsBoolean()
  @IsOptional()
  hasPrevPage: boolean;

  @ApiPropertyOptional({ description: 'Availability of next page', example: true })
  @IsBoolean()
  @IsOptional()
  hasNextPage: boolean;

  @ApiPropertyOptional({ description: 'Current page number', example: 11 })
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'Total number of pages', example: 100 })
  @IsNumber()
  @IsOptional()
  totalPages: number;

  @ApiPropertyOptional({ description: 'Previous page number if available or NULL', example: 10 })
  @IsNumber()
  @IsOptional()
  prevPage: number;

  @ApiPropertyOptional({ description: 'Next page number if available or NULL', example: 12 })
  @IsNumber()
  @IsOptional()
  nextPage: number;

  @ApiPropertyOptional({
    description: 'The starting index/serial/chronological number of first document in current page',
    example: 11
  })
  @IsNumber()
  @IsOptional()
  pagingCounter: number;
}
