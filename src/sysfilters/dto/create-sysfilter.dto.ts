import { OmitType } from '@nestjs/swagger';

import { SysfilterDto } from './sysfilter.dto';

export class CreateSysfilterDto extends OmitType(SysfilterDto, ['id', 'createdAt', 'updatedAt'] as const) {}
