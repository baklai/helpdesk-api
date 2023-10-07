import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scope } from 'src/common/enums/scope.enum';

import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
@Scopes(Scope.ReportRead)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('unwanted-software')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List of unwanted software',
    description: 'Required user scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  async getUnwantedSoftware() {
    return this.reportsService.getUnwantedSoftware();
  }

  @Get('internet-access')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List of users with internet access',
    description: 'Required user scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  async getInternetAccess() {
    return this.reportsService.getInternetAccess();
  }

  @Get('users-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List of users with email',
    description: 'Required user scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  async getEmails() {
    return this.reportsService.getUsersEmail();
  }
}
