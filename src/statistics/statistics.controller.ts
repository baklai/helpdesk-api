import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/scopes.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('network')
  @Roles(Scope.StatisticNetworkRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve network statistics' })
  async network() {
    return await this.statisticsService.network();
  }

  @Get('request')
  @Roles(Scope.StatisticRequestRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve request statistics' })
  async request() {
    return await this.statisticsService.request();
  }

  @Get('inspector')
  @Roles(Scope.StatisticInspectorRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve inspector statistics' })
  async inspector() {
    return await this.statisticsService.inspector();
  }

  @Get('dashboard')
  @Roles(Scope.StatisticDashboardRead)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve dashboard statistics' })
  async dashboard() {
    return await this.statisticsService.dashboard();
  }
}
