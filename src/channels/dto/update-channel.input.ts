import { InputType, PartialType } from '@nestjs/graphql';

import { CreateChannelInput } from './create-channel.input';

@InputType({ description: 'Оновлення каналу' })
export class UpdateChannelInput extends PartialType(CreateChannelInput) {}
