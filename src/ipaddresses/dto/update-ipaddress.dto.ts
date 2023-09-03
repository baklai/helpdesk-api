import { PartialType } from '@nestjs/swagger';

import { CreateIpaddressDto } from './create-ipaddress.dto';

export class UpdateIpaddressDto extends PartialType(CreateIpaddressDto) {}
