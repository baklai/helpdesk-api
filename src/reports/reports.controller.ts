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
  @ApiOperation({
    summary: 'List of unwanted software',
    description: 'Required scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async getUnwantedSoftware() {
    return this.reportsService.getUnwantedSoftware();
  }

  @Get('internet-access')
  @ApiOperation({
    summary: 'List of profiles with internet access',
    description: 'Required scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async getInternetAccess() {
    return this.reportsService.getInternetAccess();
  }

  @Get('profiles-email')
  @ApiOperation({
    summary: 'List of profiles with email',
    description: 'Required scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  @HttpCode(HttpStatus.OK)
  async getEmails() {
    return this.reportsService.getProfilesEmail();
  }
}
