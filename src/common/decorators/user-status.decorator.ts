import { SetMetadata } from '@nestjs/common';

import { UserStatus } from 'src/common/enums/user-status.enum';

export const STATUS_KEY = 'USER_STATUS';

export const Status = (...statuses: UserStatus[]) => SetMetadata(STATUS_KEY, statuses);
