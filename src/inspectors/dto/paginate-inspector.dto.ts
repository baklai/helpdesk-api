import { ApiProperty } from '@nestjs/swagger';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { InspectorDto } from './inspector.dto';

export class PaginateInspectorDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [InspectorDto], description: 'Array of documents' })
  docs?: InspectorDto[];
}
