import { OmitType } from '@nestjs/swagger';

import { FilterDto } from './filter.dto';

export class CreateFilterDto extends OmitType(FilterDto, [
  'id',
  'createdAt',
  'updatedAt'
] as const) {}
