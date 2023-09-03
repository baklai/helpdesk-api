import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('network')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve network statistics' })
  async network() {
    return await this.statisticsService.network();
  }

  @Get('request')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve request statistics' })
  async request() {
    return await this.statisticsService.request();
  }

  @Get('inspector')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve inspector statistics' })
  async inspector() {
    return await this.statisticsService.inspector();
  }

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve dashboard statistics' })
  async dashboard() {
    return await this.statisticsService.dashboard();
  }
}
