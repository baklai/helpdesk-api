import { SetMetadata } from '@nestjs/common';

import { ScopeKey } from 'src/common/scope/user.scope';

export const SCOPE_KEY = 'USER_SCOPE';

export const Scope = (...scopes: ScopeKey[]) => SetMetadata(SCOPE_KEY, scopes);
