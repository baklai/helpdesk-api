import { InputType, PartialType } from '@nestjs/graphql';

import { CreateDeviceInput } from './create-device.input';

@InputType({ description: 'Оновлення пристрою' })
export class UpdateDeviceInput extends PartialType(CreateDeviceInput) {}
