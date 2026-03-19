import { InputType, PartialType } from '@nestjs/graphql';

import { CreateReportInput } from './create-report.input';

@InputType({ description: 'Оновлення звіту' })
export class UpdateReportInput extends PartialType(CreateReportInput) {}
