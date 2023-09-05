import { OmitType } from '@nestjs/swagger';

import { DepartmentDto } from './department.dto';

export class CreateDepartmentDto extends OmitType(DepartmentDto, [
  'id',
  'createdAt',
  'updatedAt'
] as const) {}
