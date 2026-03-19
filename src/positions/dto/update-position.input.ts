import { InputType, PartialType } from '@nestjs/graphql';

import { CreatePositionInput } from './create-position.input';

@InputType({ description: 'Оновлення посади' })
export class UpdatePositionInput extends PartialType(CreatePositionInput) {}
