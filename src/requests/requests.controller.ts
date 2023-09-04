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
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/scopes.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { RequestsService } from './requests.service';
import { Request } from './schemas/request.schema';
import { RequestDto } from './dto/request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PaginateRequestDto } from './dto/paginate-request.dto';

@ApiTags('Requests')
@Controller('requests')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Roles(Scope.RequestCreate)
  @ApiOperation({ summary: 'Create a new request' })
  @ApiCreatedResponse({ description: 'Request created successfully', type: RequestDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestsService.create(createRequestDto);
  }

  @Get()
  @Roles(Scope.RequestRead)
  @ApiOperation({ summary: 'Get all requests' })
  @ApiOkResponse({ description: 'Success', type: PaginateRequestDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Request>> {
    return await this.requestsService.findAll(query);
  }

  @Get(':id')
  @Roles(Scope.RequestRead)
  @ApiOperation({ summary: 'Get a request by ID' })
  @ApiOkResponse({ description: 'Success', type: RequestDto })
  @ApiNotFoundResponse({ description: 'Request not found' })
  @ApiBadRequestResponse({ description: 'Invalid request ID' })
  async findOneById(@Param('id') id: string, @Query('populate') populate: boolean): Promise<Request> {
    return await this.requestsService.findOneById(id, populate);
  }

  @Put(':id')
  @Roles(Scope.RequestUpdate)
  @ApiOperation({ summary: 'Update a request by ID' })
  @ApiOkResponse({ description: 'Request updated successfully', type: RequestDto })
  @ApiNotFoundResponse({ description: 'Request not found' })
  @ApiConflictResponse({ description: 'A request with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid request ID' })
  async updateOneById(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto): Promise<Request> {
    return await this.requestsService.updateOneById(id, updateRequestDto);
  }

  @Delete(':id')
  @Roles(Scope.RequestDelete)
  @ApiOperation({ summary: 'Delete a request by ID' })
  @ApiOkResponse({ description: 'Request deleted successfully', type: RequestDto })
  @ApiNotFoundResponse({ description: 'Request not found' })
  @ApiBadRequestResponse({ description: 'Invalid request ID' })
  async removeOneById(@Param('id') id: string): Promise<Request> {
    return await this.requestsService.removeOneById(id);
  }
}
