import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  protected override getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    const req = ctx.req || ctx.extra?.request || {};
    const res = ctx.res || ctx.extra?.res || {};

    if (typeof req.header !== 'function') {
      req.header = (name: string) => {
        const headers = req.headers || ctx.extra?.connectionParams || {};
        return headers[name.toLowerCase()];
      };
    }

    if (typeof res.header !== 'function') {
      res.header = function () {
        return this;
      };
    }
    if (typeof res.set !== 'function') {
      res.set = function () {
        return this;
      };
    }

    return { req, res };
  }

  protected override getTracker(req: Record<string, unknown>): Promise<string> {
    const headers = req?.headers as Record<string, string | string[] | undefined> | undefined;
    const forwardedFor = headers?.['x-forwarded-for'];
    const rawIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(',')[0]?.trim();
    return Promise.resolve((req?.ip as string | undefined) ?? rawIp ?? '127.0.0.1');
  }
}
