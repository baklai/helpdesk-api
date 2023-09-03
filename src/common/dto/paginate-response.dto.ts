import { ApiProperty } from '@nestjs/swagger';

export class PaginateV2ResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Total number of documents in collection that match a query'
  })
  totalDocs?: number;

  @ApiProperty({ type: Number, description: 'Limit that was used' })
  limit?: number;

  @ApiProperty({
    type: Number,
    description: 'Only if specified or default page/offset values were used'
  })
  offset?: number;

  @ApiProperty({ type: Boolean, description: 'Availability of prev page' })
  hasPrevPage?: boolean;

  @ApiProperty({ type: Boolean, description: 'Availability of next page' })
  hasNextPage?: boolean;

  @ApiProperty({ type: Number, description: 'Current page number' })
  page?: number;

  @ApiProperty({ type: Number, description: 'Total number of pages' })
  totalPages?: number;

  @ApiProperty({ type: Number, description: 'Previous page number if available or NULL' })
  prevPage?: number;

  @ApiProperty({ type: Number, description: 'Next page number if available or NULL' })
  nextPage?: number;

  @ApiProperty({
    type: Number,
    description: 'The starting index/serial/chronological number of first document in current page'
  })
  pagingCounter?: number;
}
