import { ApiProperty } from '@nestjs/swagger';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { ChannelDto } from './channel.dto';

export class PaginateChannelDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [ChannelDto], description: 'Array of documents' })
  docs?: ChannelDto[];
}
