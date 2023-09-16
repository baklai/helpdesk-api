import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { ChannelDto } from './channel.dto';

export class PaginateChannelDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [ChannelDto], description: 'Array of documents' })
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  docs: ChannelDto[];
}
