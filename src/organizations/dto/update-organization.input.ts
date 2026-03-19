import { InputType, PartialType } from '@nestjs/graphql';

import { CreateOrganizationInput } from './create-organization.input';

@InputType({ description: 'Оновлення організації' })
export class UpdateOrganizationInput extends PartialType(CreateOrganizationInput) {}
