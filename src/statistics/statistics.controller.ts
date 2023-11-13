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
  @ApiOperation({
    summary: 'Retrieve network statistics',
    description: 'Required scopes: [' + [Scope.StatisticNetworkRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async network() {
    return await this.statisticsService.network();
  }

  @Get('request')
  @Scopes(Scope.StatisticRequestRead)
  @ApiOperation({
    summary: 'Retrieve request statistics',
    description: 'Required scopes: [' + [Scope.StatisticRequestRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async request() {
    return await this.statisticsService.request();
  }

  @Get('inspector')
  @Scopes(Scope.StatisticInspectorRead)
  @ApiOperation({
    summary: 'Retrieve inspector statistics',
    description: 'Required scopes: [' + [Scope.StatisticInspectorRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async inspector() {
    return await this.statisticsService.inspector();
  }

  @Get('dashboard')
  @Scopes(Scope.StatisticDashboardRead)
  @ApiOperation({
    summary: 'Retrieve dashboard statistics',
    description: 'Required scopes: [' + [Scope.StatisticDashboardRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async dashboard() {
    return await this.statisticsService.dashboard();
  }
}
