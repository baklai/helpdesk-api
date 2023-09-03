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

import { SysfiltersService } from './sysfilters.service';
import { Sysfilter } from './schemas/sysfilter.schema';
import { SysfilterDto } from './dto/sysfilter.dto';
import { CreateSysfilterDto } from './dto/create-sysfilter.dto';
import { UpdateSysfilterDto } from './dto/update-sysfilter.dto';
import { QuerySysfilterDto } from './dto/query-sysfilter.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('System filters')
@Controller('sysfilters')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class SysfiltersController {
  constructor(private readonly filtersService: SysfiltersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new filter' })
  @ApiCreatedResponse({ description: 'Filter created successfully', type: SysfilterDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createBranchDto: CreateSysfilterDto): Promise<Sysfilter> {
    return await this.filtersService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all filters' })
  @ApiOkResponse({ description: 'Success', type: [SysfilterDto] })
  async findAll(@Query() query: QuerySysfilterDto): Promise<Sysfilter[]> {
    return await this.filtersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a filter by ID' })
  @ApiOkResponse({ description: 'Success', type: SysfilterDto })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async findOneById(@Param('id') id: string): Promise<Sysfilter> {
    return await this.filtersService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a filter by ID' })
  @ApiOkResponse({ description: 'Filter updated successfully', type: SysfilterDto })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async updateOneById(@Param('id') id: string, @Body() updateBranchDto: UpdateSysfilterDto): Promise<Sysfilter> {
    return await this.filtersService.updateOneById(id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a filter by ID' })
  @ApiOkResponse({ description: 'Filter deleted successfully', type: SysfilterDto })
  @ApiNotFoundResponse({ description: 'Filter not found' })
  @ApiBadRequestResponse({ description: 'Invalid filter ID' })
  async removeOneById(@Param('id') id: string): Promise<Sysfilter> {
    return await this.filtersService.removeOneById(id);
  }
}
