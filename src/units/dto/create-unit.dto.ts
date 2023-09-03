import { OmitType } from '@nestjs/swagger';

import { UnitDto } from './unit.dto';

export class CreateUnitDto extends OmitType(UnitDto, ['id', 'createdAt', 'updatedAt'] as const) {}
