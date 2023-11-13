import { Controller, Get, Param, Delete, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { PaginateSyslog, Syslog } from './schemas/syslog.schema';
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
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.SyslogRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateSyslog })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Syslog>> {
    return await this.syslogService.findAll(query);
  }

  @Delete()
  @Scopes(Scope.SyslogDelete)
  @ApiOperation({
    summary: 'Delete all records',
    description: 'Required scopes: [' + [Scope.SyslogDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: String })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async removeAll(): Promise<string> {
    return await this.syslogService.removeAll();
  }

  @Get(':id')
  @Scopes(Scope.SyslogRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.SyslogRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Syslog })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Syslog> {
    return await this.syslogService.findOneById(id);
  }

  @Delete(':id')
  @Scopes(Scope.SyslogDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.SyslogDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Syslog })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Syslog> {
    return await this.syslogService.removeOneById(id);
  }
}
