import { OmitType } from '@nestjs/swagger';

import { RequestDto } from './request.dto';

export class CreateRequestDto extends OmitType(RequestDto, ['id', 'createdAt', 'updatedAt'] as const) {}
