import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { FiltersService } from './filters.service';
import { Filter } from './schemas/filter.schema';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Types } from 'mongoose';

@ApiTags('Filters')
@Controller('filters')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post()
  @Scopes(Scope.FilterCreate)
  @ApiOperation({
    summary: 'Create a new filter',
    description: 'Required user scopes: [' + [Scope.FilterCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Filter created successfully', type: Filter })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
    return await this.filtersService.create(createFilterDto);
  }

  @Get()
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Get all filters',
    description: 'Required user scopes: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Filter] })
  async findAll(@Query() query: QueryFilterDto): Promise<Filter[]> {
    return await this.filtersService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Get a filter by ID',
    description: 'Required user scopes: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Filter })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Filter> {
    return await this.filtersService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.FilterUpdate)
  @ApiOperation({
    summary: 'Update a filter by ID',
    description: 'Required user scopes: [' + [Scope.FilterUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Filter updated successfully', type: Filter })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateFilterDto: UpdateFilterDto
  ): Promise<Filter> {
    return await this.filtersService.updateOneById(id, updateFilterDto);
  }

  @Delete(':id')
  @Scopes(Scope.FilterDelete)
  @ApiOperation({
    summary: 'Delete a filter by ID',
    description: 'Required user scopes: [' + [Scope.FilterDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Filter deleted successfully', type: Filter })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Filter> {
    return await this.filtersService.removeOneById(id);
  }
}
