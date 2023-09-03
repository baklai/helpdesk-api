import { ApiProperty } from '@nestjs/swagger';

import { InspectorDto } from './inspector.dto';
import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

export class PaginateInspectorDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [InspectorDto], description: 'Array of documents' })
  docs?: InspectorDto[];
}
