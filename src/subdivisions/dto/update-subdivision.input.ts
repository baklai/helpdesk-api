import { InputType, PartialType } from '@nestjs/graphql';

import { CreateSubdivisionInput } from './create-subdivision.input';

@InputType({ description: 'Оновлення підрозділу' })
export class UpdateSubdivisionInput extends PartialType(CreateSubdivisionInput) {}
