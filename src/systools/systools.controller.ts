import { Controller, Get, Header, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { pingResponse } from 'pingman';
import { Request, Response } from 'express';

import { SystoolsService } from './systools.service';
import { QueryDto } from './dto/query-systool.dto';

@ApiTags('System tools')
@Controller('systools')
export class SystoolsController {
  constructor(private readonly systoolsService: SystoolsService) {}

  @Get('inspector')
  @ApiOperation({ summary: 'Retrieve a script for inspecting system information' })
  onScriptInspector(@Req() request: Request, @Res() res: Response) {
    const protocol = request.protocol;
    const host = request.get('Host');
    const blob = this.systoolsService.scriptInspector(protocol, host);
    res.send(blob);
  }

  @Get('ping')
  @ApiOperation({ summary: 'Generate a ping link' })
  onLinkPing(@Query() query: QueryDto, @Res() res: Response) {
    const blob = this.systoolsService.linkPing(query);
    res.send(blob);
  }

  @Get('rdp')
  @Header('content-type', 'application/octet-stream')
  @ApiOperation({ summary: 'Generate an RDP (Remote Desktop Protocol) link' })
  onLinkRDP(@Query() query: QueryDto, @Res() res: Response) {
    const blob = this.systoolsService.linkRDP(query);
    res.send(blob);
  }

  @Get('vnc')
  @ApiOperation({ summary: 'Generate a VNC (Virtual Network Computing) link' })
  onLinkVNC(@Query() query: QueryDto, @Res() res: Response) {
    const blob = this.systoolsService.linkVNC(query);
    res.send(blob);
  }
}
