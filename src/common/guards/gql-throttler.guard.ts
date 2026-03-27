import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  protected override getRequestResponse(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, res } = ctx.getContext();

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
