import { OmitType } from '@nestjs/swagger';

import { NoticeDto } from './notice.dto';

export class CreateNoticeDto extends OmitType(NoticeDto, [
  'id',
  'createdAt',
  'updatedAt'
] as const) {}
