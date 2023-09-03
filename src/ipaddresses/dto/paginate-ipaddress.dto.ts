import { ApiProperty } from '@nestjs/swagger';

import { IpaddressDto } from './ipaddress.dto';
import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

export class PaginateIpaddressDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [IpaddressDto], description: 'Array of documents' })
  docs?: IpaddressDto[];
}
