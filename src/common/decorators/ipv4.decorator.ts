import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IPv4 = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;

  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

  const ip = Array.isArray(rawIp) ? rawIp[0] : rawIp;
  return ip.replace('::ffff:', '');
});
