import { OmitType } from '@nestjs/swagger';

import { EnterpriseDto } from './enterprise.dto';

export class CreateEnterpriseDto extends OmitType(EnterpriseDto, [
  'id',
  'createdAt',
  'updatedAt'
] as const) {}
