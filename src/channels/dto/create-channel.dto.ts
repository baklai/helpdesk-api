import { OmitType } from '@nestjs/swagger';

import { ChannelDto } from './channel.dto';

export class CreateChannelDto extends OmitType(ChannelDto, [
  'id',
  'createdAt',
  'updatedAt'
] as const) {}
