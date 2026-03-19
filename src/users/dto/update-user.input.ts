import { InputType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType({ description: 'Оновлення користувача' })
export class UpdateUserInput extends PartialType(CreateUserInput) {}
