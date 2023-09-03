import { ApiProperty } from '@nestjs/swagger';

import { ChannelDto } from './channel.dto';
import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

export class PaginateChannelDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [ChannelDto], description: 'Array of documents' })
  docs?: ChannelDto[];
}
