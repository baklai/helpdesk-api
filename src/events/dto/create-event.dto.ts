import { OmitType } from '@nestjs/swagger';

import { EventDto } from './event.dto';

export class CreateEventDto extends OmitType(EventDto, ['id', 'createdAt', 'updatedAt'] as const) {}
