import { InputType, PartialType } from '@nestjs/graphql';

import { CreateLocationInput } from './create-location.input';

@InputType({ description: 'Оновлення локації' })
export class UpdateLocationInput extends PartialType(CreateLocationInput) {}
