import { InputType, PartialType } from '@nestjs/graphql';

import { CreateDepartmentInput } from './create-department.input';

@InputType({ description: 'Оновлення відділу' })
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {}
