import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { SyslogsService } from './syslogs.service';

@ApiTags('System Logs')
@Controller('syslogs')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class SyslogsController {
  constructor(private readonly syslogService: SyslogsService) {}

  @Get()
  @Scopes(Scope.SyslogRead)
  @ApiOperation({
    summary: 'Get all logs',
    description: 'Required user scopes: [' + [Scope.SyslogRead].join(',') + ']'
  })
  findAll() {
    return this.syslogService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.SyslogRead)
  @ApiOperation({
    summary: 'Get a log by ID',
    description: 'Required user scopes: [' + [Scope.SyslogRead].join(',') + ']'
  })
  findOneById(@Param('id') id: string) {
    return this.syslogService.findOneById(id);
  }

  @Delete(':id')
  @Scopes(Scope.SyslogDelete)
  @ApiOperation({
    summary: 'Delete a log by ID',
    description: 'Required user scopes: [' + [Scope.SyslogDelete].join(',') + ']'
  })
  removeOneById(@Param('id') id: string) {
    return this.syslogService.removeOneById(id);
  }
}
