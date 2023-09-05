import { OmitType } from '@nestjs/swagger';

import { PositionDto } from './position.dto';

export class CreatePositionDto extends OmitType(PositionDto, [
  'id',
  'createdAt',
  'updatedAt'
] as const) {}
