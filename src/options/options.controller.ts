import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiExcludeController,
  ApiBadRequestResponse
} from '@nestjs/swagger';

import { OptionsService } from './options.service';
import { CreateOptionDto } from '../options/dto/create-option.dto';
import { UpdateOptionDto } from '../options/dto/update-option.dto';
import { Option } from '../options/schemas/option.schema';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scope } from 'src/common/enums/scope.enum';

@ApiTags('System Options')
@Controller('options')
@ApiExcludeController()
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @Scopes(Scope.OptionCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.OptionCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Option })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateOptionDto })
  async create(@Body() createOptionDto: CreateOptionDto): Promise<Option> {
    return await this.optionsService.create(createOptionDto);
  }

  @Get()
  @Scopes(Scope.OptionRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.OptionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Option] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Option[]> {
    return await this.optionsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.OptionRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.OptionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Option })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Option> {
    return await this.optionsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.OptionUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.OptionUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Option })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateOptionDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateOptionDto: UpdateOptionDto
  ): Promise<Option> {
    return await this.optionsService.updateOneById(id, updateOptionDto);
  }

  @Delete(':id')
  @Scopes(Scope.OptionDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.OptionDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Option })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Option> {
    return await this.optionsService.removeOneById(id);
  }
}
