import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
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

  //  async use(req: Request, res: Response, next: NextFunction) {

  async use(req: Request, res: Response, next: NextFunction) {
    // await this.syslogsService.create({
    //   // user: req?.user || null,
    //   method: req?.method || null,
    //   baseUrl: req?.baseUrl || null,
    //   params: req?.params || null,
    //   query: req?.query || null,
    //   body: req?.body || null,
    //   status: res?.statusCode || null
    // });
    next();
  }
}
