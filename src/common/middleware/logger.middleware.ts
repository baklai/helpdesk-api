import { Injectable, Logger, NestMiddleware, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { SyslogsService } from 'src/syslogs/syslogs.service';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { ScopesGuard } from '../guards/scopes.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class LoggerMiddleware implements NestMiddleware {
  constructor(private syslogsService: SyslogsService) {}
  private logger = new Logger('HTTP');

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { ip, user, method, baseUrl, query, params, body } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('close', async () => {
      const { statusCode } = response;
      this.logger.log(`${ip} ${method} ${baseUrl} ${statusCode} - ${userAgent} `);

      await this.syslogsService.create({
        ip: ip,
        user: user ? JSON.stringify(user) : null,
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
