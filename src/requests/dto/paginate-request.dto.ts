import { ApiProperty } from '@nestjs/swagger';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { RequestDto } from './request.dto';

export class PaginateRequestDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [RequestDto], description: 'Array of documents' })
  docs?: RequestDto[];
}
