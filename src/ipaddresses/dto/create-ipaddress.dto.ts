import { OmitType } from '@nestjs/swagger';

import { IpaddressDto } from './ipaddress.dto';

export class CreateIpaddressDto extends OmitType(IpaddressDto, [
  'id',
  'indexip',
  'createdAt',
  'updatedAt'
]) {}
