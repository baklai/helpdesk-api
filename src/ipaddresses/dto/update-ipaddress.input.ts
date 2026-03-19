import { InputType, PartialType } from '@nestjs/graphql';

import { CreateIpaddressInput } from './create-ipaddress.input';

@InputType({ description: 'Оновлення IP-адреси' })
export class UpdateIpaddressInput extends PartialType(CreateIpaddressInput) {}
