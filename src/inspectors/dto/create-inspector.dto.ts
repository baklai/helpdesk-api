import { OmitType } from '@nestjs/swagger';

import { InspectorDto } from './inspector.dto';

export class CreateInspectorDto extends OmitType(InspectorDto, ['id', 'createdAt', 'updatedAt'] as const) {}
