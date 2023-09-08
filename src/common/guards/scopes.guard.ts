import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SCOPES_KEY } from '../decorators/scopes.decorator';
import { Scope } from '../enums/scope.enum';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Scope[]>(SCOPES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user?.isActive) {
      return false;
    }

    if (user?.isAdmin) {
      return true;
    }

    return requiredRoles.some(role => user?.scope?.includes(role));
  }
}
