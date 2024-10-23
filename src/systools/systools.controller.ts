import { Controller, Get, Header, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SystoolsService } from './systools.service';
import { QueryDto } from './dto/query-systool.dto';

@ApiTags('Системні засоби')
@Controller('systools')
export class SystoolsController {
  constructor(private readonly systoolsService: SystoolsService) {}

  @Get('inspector')
  @ApiOperation({ summary: 'Отримати сценарій для перевірки системної інформації' })
  onScriptInspector(@Req() request: Request, @Res() res: Response) {
    const protocol = request.protocol;
    const host = request.get('Host');
    const blob = this.systoolsService.scriptInspector(protocol, host);
    res.send(blob);
  }

  @Get('ping')
  @ApiOperation({ summary: 'Створіть посилання ping' })
  onLinkPing(@Query() query: QueryDto, @Res() res: Response) {
    const blob = this.systoolsService.linkPing(query);
    res.send(blob);
  }

  @Get('rdp')
  @Header('content-type', 'application/octet-stream')
  @ApiOperation({ summary: 'Створіть посилання RDP (протокол віддаленого робочого столу).' })
  onLinkRDP(@Query() query: QueryDto, @Res() res: Response) {
    const blob = this.systoolsService.linkRDP(query);
    res.send(blob);
  }

  @Get('vnc')
  @ApiOperation({ summary: 'Створіть посилання VNC (Virtual Network Computing).' })
  onLinkVNC(@Query() query: QueryDto, @Res() res: Response) {
    const blob = this.systoolsService.linkVNC(query);
    res.send(blob);
  }
}
