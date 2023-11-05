import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';
import { OnmapDto } from './onmap.dto';

export class PaginateOnmapDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [OnmapDto], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: OnmapDto[];
}
