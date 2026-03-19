import { SetMetadata } from '@nestjs/common';

import { UserRole } from 'src/common/enums/user-role.enum';

export const ROLE_KEY = 'USER_ROLE';

export const Role = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
