import { OmitType } from '@nestjs/swagger';

import { BranchDto } from './branch.dto';

export class CreateBranchDto extends OmitType(BranchDto, ['id', 'createdAt', 'updatedAt']) {}
