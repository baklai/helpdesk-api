import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PaginateV2ResponseDto {
  @ApiPropertyOptional({
    description: 'Total number of documents in collection that match a query',
    example: 100
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  totalDocs: number;

  @ApiPropertyOptional({ description: 'Limit that was used', example: 1 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({
    description: 'Only if specified or default page/offset values were used',
    example: 10
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  offset: number;

  @ApiPropertyOptional({ description: 'Availability of prev page', example: true })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  hasPrevPage: boolean;

  @ApiPropertyOptional({ description: 'Availability of next page', example: true })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  hasNextPage: boolean;

  @ApiPropertyOptional({ description: 'Current page number', example: 11 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'Total number of pages', example: 100 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  totalPages: number;

  @ApiPropertyOptional({ description: 'Previous page number if available or NULL', example: 10 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  prevPage: number;

  @ApiPropertyOptional({ description: 'Next page number if available or NULL', example: 12 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  nextPage: number;

  @ApiPropertyOptional({
    description: 'The starting index/serial/chronological number of first document in current page',
    example: 11
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  pagingCounter: number;
}
