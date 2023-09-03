import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

const matchScopes = (scopes: string[], userScope: string[]) => {
  return false;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get(Roles, context.getHandler());
    if (!scopes) {
      return true;
    }
    return false;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchScopes(scopes, user.scope);
  }
}
