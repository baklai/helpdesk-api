import { InputType, PartialType } from '@nestjs/graphql';

import { CreateMailboxInput } from './create-mailbox.input';

@InputType({ description: 'Оновлення поштової скриньки' })
export class UpdateMailboxInput extends PartialType(CreateMailboxInput) {}
