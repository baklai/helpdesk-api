import { OmitType } from '@nestjs/swagger';

import { LocationDto } from './location.dto';

export class CreateLocationDto extends OmitType(LocationDto, ['id', 'createdAt', 'updatedAt'] as const) {}
