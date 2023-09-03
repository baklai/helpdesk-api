import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { pingResponse } from 'pingman';
import { Request } from 'express';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { SystoolsService } from './systools.service';
import { QueryDto } from './dto/query-systool.dto';

@ApiTags('System tools')
@Controller('systools')
export class SystoolsController {
  constructor(private readonly systoolsService: SystoolsService) {}

  @Get('/rdp')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Generate an RDP (Remote Desktop Protocol) link' })
  onLinkRDP(@Query() query: QueryDto): Buffer {
    return this.systoolsService.linkRDP(query);
  }

  @Get('/vnc')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Generate a VNC (Virtual Network Computing) link' })
  onLinkVNC(@Query() query: QueryDto): Buffer {
    return this.systoolsService.linkVNC(query);
  }

  @Get('/ping')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Generate a ping link' })
  onLinkPing(@Query() query: QueryDto): Buffer {
    return this.systoolsService.linkPing(query);
  }

  @Get('/ping-online')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Execute a ping command and return the response' })
  onCommandPing(@Query() query: QueryDto): Promise<pingResponse> {
    return this.systoolsService.commandPing(query);
  }

  @Get('/inspector')
  @ApiOperation({ summary: 'Retrieve a script for inspecting system information' })
  onScriptInspector(@Req() request: Request): Buffer {
    const protocol = request.protocol;
    const host = request.get('Host');
    return this.systoolsService.scriptInspector(protocol, host);
  }
}
