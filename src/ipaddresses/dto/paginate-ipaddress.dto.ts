import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { IpaddressDto } from './ipaddress.dto';

export class PaginateIpaddressDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [IpaddressDto], description: 'Array of documents' })
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  docs: IpaddressDto[];
}
