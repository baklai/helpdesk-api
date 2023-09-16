import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { RequestDto } from './request.dto';

export class PaginateRequestDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [RequestDto], description: 'Array of documents' })
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  docs: RequestDto[];
}
