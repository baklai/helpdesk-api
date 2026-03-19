import { InputType, PartialType } from '@nestjs/graphql';

import { CreateRequestInput } from './create-request.input';

@InputType({ description: 'Оновлення заявки' })
export class UpdateRequestInput extends PartialType(CreateRequestInput) {}
