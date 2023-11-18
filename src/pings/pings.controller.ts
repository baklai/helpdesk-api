import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { Scope } from 'src/common/enums/scope.enum';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { PingsService } from './pings.service';
import { CreatePingDto } from './dto/create-ping.dto';
import { Ping, PaginatePing } from './schemas/ping.schema';

@ApiTags('Ping service')
@Controller('pings')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class PingsController {
  constructor(private readonly pingsService: PingsService) {}

  @Post()
  @Scopes(Scope.PingCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.PingCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Ping })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreatePingDto })
  async create(@Body() createPingDto: CreatePingDto): Promise<Ping> {
    return await this.pingsService.create(createPingDto);
  }

  @Get()
  @Scopes(Scope.PingRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.PingRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginatePing })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Ping>> {
    return await this.pingsService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.PingRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.PingRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ping })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  async findOneById(@Param('id') id: string, @Query('populate') populate: boolean): Promise<Ping> {
    return await this.pingsService.findOneById(id, populate);
  }

  @Delete(':id')
  @Scopes(Scope.PingDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.PingDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ping })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Ping> {
    return await this.pingsService.removeOneById(id);
  }
}
