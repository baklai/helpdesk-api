import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { PaginateResult, Types } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { RequestsService } from './requests.service';
import { PaginateRequest, Request } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@ApiTags('Requests')
@Controller('requests')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Scopes(Scope.RequestCreate)
  @ApiOperation({
    summary: 'Create a new request',
    description: 'Required user scopes: [' + [Scope.RequestCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Request created successfully', type: Request })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestsService.create(createRequestDto);
  }

  @Get()
  @Scopes(Scope.RequestRead)
  @ApiOperation({
    summary: 'Get all requests',
    description: 'Required user scopes: [' + [Scope.RequestRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateRequest })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Request>> {
    return await this.requestsService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.RequestRead)
  @ApiOperation({
    summary: 'Get a request by ID',
    description: 'Required user scopes: [' + [Scope.RequestRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Request })
  @ApiNotFoundResponse({ description: 'Request not found' })
  @ApiBadRequestResponse({ description: 'Invalid request ID' })
  async findOneById(
    @Param('id') id: Types.ObjectId,
    @Query('populate') populate: boolean
  ): Promise<Request> {
    return await this.requestsService.findOneById(id, populate);
  }

  @Put(':id')
  @Scopes(Scope.RequestUpdate)
  @ApiOperation({
    summary: 'Update a request by ID',
    description: 'Required user scopes: [' + [Scope.RequestUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Request updated successfully', type: Request })
  @ApiNotFoundResponse({ description: 'Request not found' })
  @ApiConflictResponse({ description: 'A request with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid request ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateRequestDto: UpdateRequestDto
  ): Promise<Request> {
    return await this.requestsService.updateOneById(id, updateRequestDto);
  }

  @Delete(':id')
  @Scopes(Scope.RequestDelete)
  @ApiOperation({
    summary: 'Delete a request by ID',
    description: 'Required user scopes: [' + [Scope.RequestDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Request deleted successfully', type: Request })
  @ApiNotFoundResponse({ description: 'Request not found' })
  @ApiBadRequestResponse({ description: 'Invalid request ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Request> {
    return await this.requestsService.removeOneById(id);
  }
}
