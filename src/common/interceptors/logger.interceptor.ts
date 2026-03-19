import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { SysLogsService } from 'src/syslogs/syslogs.service';

@Injectable()
export class GraphqlLoggerInterceptor implements NestInterceptor {
  private logger = new Logger('GraphQL');

  constructor(private readonly sysLogsService: SysLogsService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const info = ctx.getInfo();
    const start = Date.now();

    const userId = req?.user?.id || null;
    const xForwardedFor = req?.headers['x-forwarded-for'];

    let ipaddress: string;

    if (xForwardedFor) {
      ipaddress = Array.isArray(xForwardedFor)
        ? xForwardedFor[0]
        : xForwardedFor.split(',')[0].trim();
    } else {
      ipaddress = req?.ip || req?.socket?.remoteAddress || '127.0.0.1';
    }

    if (ipaddress.includes('::ffff:')) {
      ipaddress = ipaddress.replace('::ffff:', '');
    }
    const userAgent = req?.headers['user-agent'] || 'unknown';
    const method = info?.parentType?.name?.toUpperCase() || '-';
    const methodName = info?.fieldName || '-';

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;

        this.logger.log(
          `${ipaddress} [${userId || 'anonymous'}] [${method}] [${methodName}] - SUCCESS (${duration}ms)`
        );

        this.sysLogsService
          .create({
            ipaddress: ipaddress,
            user: userId,
            method: method,
            methodName: methodName,
            status: 200,
            userAgent: userAgent
          })
          .catch(err => this.logger.warn(`Не вдалося зберегти лог: ${err.message}`));
      }),

      catchError(error => {
        const duration = Date.now() - start;
        const statusCode = error.status || 500;

        this.logger.error(
          `${ipaddress} [${userId || 'anonymous'}] [${method}] [${methodName}] - FAILED (${duration}ms): ${error.message}`
        );

        this.sysLogsService
          .create({
            ipaddress: ipaddress,
            user: userId,
            method: method,
            methodName: methodName,
            status: statusCode,
            userAgent: userAgent,
            error: error.message
          })
          .catch(err => this.logger.warn(`Не вдалося зберегти лог помилок: ${err.message}`));

        return throwError(() => error);
      })
    );
  }
}
