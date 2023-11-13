import { Ip, Get, Post, Body, Param, Delete, Query, UseGuards, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { AggregatePaginateResult, Types } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { InspectorsService } from './inspectors.service';
import { Inspector, PaginateInspector } from './schemas/inspector.schema';

@ApiTags('PC SysInspectors')
@Controller('inspectors')
export class InspectorsController {
  constructor(private readonly inspectorService: InspectorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: []'
  })
  @ApiExcludeEndpoint()
  @ApiCreatedResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(
    @Ip() ip: string,
    @Query() query: Record<string, any>,
    @Body() createInspectorDto: Record<string, any>
  ) {
    return await this.inspectorService.create(ip, query.field, createInspectorDto);
  }

  @Get()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateInspector })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Inspector>> {
    return await this.inspectorService.findAll(query);
  }

  @Get('find')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Get record by field',
    description: 'Required scopes: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Inspector })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiQuery({ name: 'host', description: 'The value of the field', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'The aggregate records', type: Boolean })
  async findOneByHost(@Param('host') host: string): Promise<Inspector> {
    return await this.inspectorService.findOneByHost(host);
  }

  @Get(':id')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Inspector })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'The aggregate records', type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean,
    @Query('aggregate') aggregate: boolean
  ): Promise<Inspector> {
    return await this.inspectorService.findOneById(id, populate, aggregate);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.InspectorDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Inspector })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Inspector> {
    return await this.inspectorService.removeOneById(id);
  }
}
