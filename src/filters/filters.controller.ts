import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiParam
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

@ApiTags('Filters')
@Controller('filters')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post()
  @Scopes(Scope.FilterCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.FilterCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Filter })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreateFilterDto })
  async create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
    return await this.filtersService.create(createFilterDto);
  }

  @Get()
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Filter] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: QueryFilterDto): Promise<Filter[]> {
    return await this.filtersService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Filter })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Filter> {
    return await this.filtersService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.FilterUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.FilterUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Filter })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateFilterDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateFilterDto: UpdateFilterDto
  ): Promise<Filter> {
    return await this.filtersService.updateOneById(id, updateFilterDto);
  }

  @Delete(':id')
  @Scopes(Scope.FilterDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.FilterDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Filter })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Filter> {
    return await this.filtersService.removeOneById(id);
  }
}
