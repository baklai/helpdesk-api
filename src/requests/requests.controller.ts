import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { RequestsService } from './requests.service';
import { PaginateRequest, Request } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@ApiTags('Helpdesk requests')
@Controller('requests')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Scopes(Scope.RequestCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.RequestCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Request })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreateRequestDto })
  async create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestsService.create(createRequestDto);
  }

  @Get()
  @Scopes(Scope.RequestRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.RequestRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateRequest })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Request>> {
    return await this.requestsService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.RequestRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.RequestRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Request })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'The aggregate records', type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean,
    @Query('aggregate') aggregate: boolean
  ): Promise<Request> {
    return await this.requestsService.findOneById(id, populate, aggregate);
  }

  @Put(':id')
  @Scopes(Scope.RequestUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.RequestUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Request })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateRequestDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto
  ): Promise<Request> {
    return await this.requestsService.updateOneById(id, updateRequestDto);
  }

  @Delete(':id')
  @Scopes(Scope.RequestDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required user scopes: [' + [Scope.RequestDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Request })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Request> {
    return await this.requestsService.removeOneById(id);
  }
}
