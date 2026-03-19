import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ROLE_KEY } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new UnauthorizedException('Користувач не ідентифікований');
    }

    const currentUserRole = user.role as UserRole;
    const currentUserStatus = user.status as UserStatus;

    if (currentUserRole === UserRole.ADMIN) {
      return true;
    }

    if (currentUserStatus !== UserStatus.ACTIVE) {
      throw new ForbiddenException(
        `Ваш обліковий запис має статус "${currentUserStatus}". Дія заборонена.`
      );
    }

    const hasRole = allowedRoles.includes(currentUserRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `Недостатньо прав. Доступні ролі: ${allowedRoles.join(', ')}. Ваша роль: ${currentUserRole}`
      );
    }

    return true;
  }
}
