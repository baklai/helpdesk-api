import { Controller, Get, UseGuards } from '@nestjs/common';
import { NetmapsService } from './netmaps.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

@ApiTags('Network maps')
@Controller('netmaps')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class NetmapsController {
  constructor(private readonly netmapsService: NetmapsService) {}

  @Get()
  @Scopes(Scope.NetmapRead)
  networkMap() {
    return this.netmapsService.networkMap();
  }
}
