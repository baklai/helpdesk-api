import { ApiProperty } from '@nestjs/swagger';

import { RequestDto } from './request.dto';
import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

export class PaginateRequestDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [RequestDto], description: 'Array of documents' })
  docs?: RequestDto[];
}
