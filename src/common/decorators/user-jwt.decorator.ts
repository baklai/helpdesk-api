import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtPayload } from 'src/common/types/jwt-payload.type';

export const JwtProfile = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx);
  const user = gqlContext.getContext().req.user;

  if (!user) {
    throw new UnauthorizedException('Користувача не знайдено в контексті запиту');
  }

  return user as JwtPayload;
});
