import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('network')
  @Scopes(Scope.StatisticNetworkRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve network statistics',
    description: 'Required user scopes: [' + [Scope.StatisticNetworkRead].join(',') + ']'
  })
  async network() {
    return await this.statisticsService.network();
  }

  @Get('request')
  @Scopes(Scope.StatisticRequestRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve request statistics',
    description: 'Required user scopes: [' + [Scope.StatisticRequestRead].join(',') + ']'
  })
  async request() {
    return await this.statisticsService.request();
  }

  @Get('inspector')
  @Scopes(Scope.StatisticInspectorRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve inspector statistics',
    description: 'Required user scopes: [' + [Scope.StatisticInspectorRead].join(',') + ']'
  })
  async inspector() {
    return await this.statisticsService.inspector();
  }

  @Get('dashboard')
  @Scopes(Scope.StatisticDashboardRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve dashboard statistics',
    description: 'Required user scopes: [' + [Scope.StatisticDashboardRead].join(',') + ']'
  })
  async dashboard() {
    return await this.statisticsService.dashboard();
  }
}
