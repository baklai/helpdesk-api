import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { STATUS_KEY } from 'src/common/decorators/user-status.decorator';
import { UserStatus } from 'src/common/enums/user-status.enum';

@Injectable()
export class UserStatusGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedStatuses = this.reflector.getAllAndOverride<UserStatus[]>(STATUS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new UnauthorizedException('Користувач не ідентифікований');
    }

    const currentStatus = user.status as UserStatus;

    if (!allowedStatuses || allowedStatuses.length === 0) {
      if (currentStatus === UserStatus.ACTIVE) {
        return true;
      }
      throw new ForbiddenException('Доступ обмежено: обліковий запис має бути активований');
    }

    const hasAccess = allowedStatuses.includes(currentStatus);

    if (!hasAccess) {
      throw new ForbiddenException(
        `Дія заборонена для поточного статусу профілю: ${currentStatus}`
      );
    }

    return true;
  }
}
