import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { SyslogsService } from 'src/syslogs/syslogs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private syslogsService: SyslogsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    await this.syslogsService.create({
      method: req.method,
      url: req.url,
      status: res.statusCode
    });
    next();
  }
}
