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

import { SysfiltersService } from './sysfilters.service';
import { Sysfilter } from './schemas/sysfilter.schema';
import { SysfilterDto } from './dto/sysfilter.dto';
import { CreateSysfilterDto } from './dto/create-sysfilter.dto';
import { UpdateSysfilterDto } from './dto/update-sysfilter.dto';
import { QuerySysfilterDto } from './dto/query-sysfilter.dto';

@ApiTags('System filters')
@Controller('sysfilters')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class SysfiltersController {
  constructor(private readonly filtersService: SysfiltersService) {}

  @Post()
  @Scopes(Scope.FilterCreate)
  @ApiOperation({
    summary: 'Create a new filter',
    description: 'Required user scopes: [' + [Scope.FilterCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Filter created successfully', type: SysfilterDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createBranchDto: CreateSysfilterDto): Promise<Sysfilter> {
    return await this.filtersService.create(createBranchDto);
  }

  @Get()
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Get all filters',
    description: 'Required user scopes: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [SysfilterDto] })
  async findAll(@Query() query: QuerySysfilterDto): Promise<Sysfilter[]> {
    return await this.filtersService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Get a filter by ID',
    description: 'Required user scopes: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: SysfilterDto })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async findOneById(@Param('id') id: string): Promise<Sysfilter> {
    return await this.filtersService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.FilterUpdate)
  @ApiOperation({
    summary: 'Update a filter by ID',
    description: 'Required user scopes: [' + [Scope.FilterUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Filter updated successfully', type: SysfilterDto })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateSysfilterDto
  ): Promise<Sysfilter> {
    return await this.filtersService.updateOneById(id, updateBranchDto);
  }

  @Delete(':id')
  @Scopes(Scope.FilterDelete)
  @ApiOperation({
    summary: 'Delete a filter by ID',
    description: 'Required user scopes: [' + [Scope.FilterDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Filter deleted successfully', type: SysfilterDto })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async removeOneById(@Param('id') id: string): Promise<Sysfilter> {
    return await this.filtersService.removeOneById(id);
  }
}
