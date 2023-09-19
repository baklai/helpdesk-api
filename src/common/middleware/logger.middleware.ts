import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { SyslogsService } from 'src/syslogs/syslogs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private syslogsService: SyslogsService) {}
  private logger = new Logger('HTTP');

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { ip, method, baseUrl, query, params, body } = request;

    const userAgent = request.get('user-agent') || '';

    response.on('close', async () => {
      const { statusCode } = response;
      const { user } = request;

      this.logger.log(
        `${ip} ${user ? user['login'] : 'anonymous'} ${method} ${statusCode} ${baseUrl}`
      );

      await this.syslogsService.create({
        host: ip,
        user: user ? user['login'] : 'anonymous',
        method: method || null,
        baseUrl: baseUrl || null,
        params: params ? JSON.stringify(params) : null,
        query: query ? JSON.stringify(query) : null,
        body: body ? JSON.stringify(body) : null,
        status: statusCode || null,
        userAgent: userAgent || null
      });
    });

    next();
  }
}
