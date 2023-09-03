import { ApiProperty } from '@nestjs/swagger';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { IpaddressDto } from './ipaddress.dto';

export class PaginateIpaddressDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [IpaddressDto], description: 'Array of documents' })
  docs?: IpaddressDto[];
}
