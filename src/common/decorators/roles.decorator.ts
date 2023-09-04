import { SetMetadata } from '@nestjs/common';

import { Scope } from '../enums/scope.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Scope[]) => SetMetadata(ROLES_KEY, roles);
