import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { InspectorDto } from './inspector.dto';

export class PaginateInspectorDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [InspectorDto], description: 'Array of documents' })
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  docs: InspectorDto[];
}
