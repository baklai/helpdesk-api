import { PartialType } from '@nestjs/swagger';

import { CreateSysfilterDto } from './create-sysfilter.dto';

export class UpdateSysfilterDto extends PartialType(CreateSysfilterDto) {}
