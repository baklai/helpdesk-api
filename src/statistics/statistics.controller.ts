import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AdminGuard } from 'src/common/guards/administrator.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { AdminRequired } from 'src/common/decorators/admin.decorator';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { StatisticsService } from './statistics.service';

@ApiTags('Статистика')
@Controller('statistics')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, AdminGuard, ScopesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('network')
  @Scopes(Scope.StatisticNetworkRead)
  @ApiOperation({
    summary: 'Отримати статистику мережі',
    description: 'Необхідні дозволи: [' + [Scope.StatisticNetworkRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async network() {
    return await this.statisticsService.network();
  }

  @Get('request')
  @Scopes(Scope.StatisticRequestRead)
  @ApiOperation({
    summary: 'Отримати статистику запитів',
    description: 'Необхідні дозволи: [' + [Scope.StatisticRequestRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async request() {
    return await this.statisticsService.request();
  }

  @Get('inspector')
  @Scopes(Scope.StatisticInspectorRead)
  @ApiOperation({
    summary: 'Отримати статистику інспектора',
    description: 'Необхідні дозволи: [' + [Scope.StatisticInspectorRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async inspector() {
    return await this.statisticsService.inspector();
  }

  @Get('dashboard')
  @AdminRequired()
  @ApiOperation({
    summary: 'Отримати статистику інформаційної панелі',
    description: 'Потрібені права адміністратора'
  })
  @HttpCode(HttpStatus.OK)
  async dashboard() {
    return await this.statisticsService.dashboard();
  }
}
