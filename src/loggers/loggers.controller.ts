import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { LoggersService } from './loggers.service';

@ApiTags('Loggers')
@Controller('loggers')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class LoggersController {
  constructor(private readonly loggerService: LoggersService) {}

  @Get()
  @Scopes(Scope.LoggerRead)
  @ApiOperation({
    summary: 'Get all logs',
    description: 'Required user scopes: [' + [Scope.LoggerRead].join(',') + ']'
  })
  findAll() {
    return this.loggerService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.LoggerRead)
  @ApiOperation({
    summary: 'Get a log by ID',
    description: 'Required user scopes: [' + [Scope.LoggerRead].join(',') + ']'
  })
  findOneById(@Param('id') id: string) {
    return this.loggerService.findOneById(id);
  }

  @Delete(':id')
  @Scopes(Scope.LoggerDelete)
  @ApiOperation({
    summary: 'Delete a log by ID',
    description: 'Required user scopes: [' + [Scope.LoggerDelete].join(',') + ']'
  })
  removeOneById(@Param('id') id: string) {
    return this.loggerService.removeOneById(id);
  }
}
