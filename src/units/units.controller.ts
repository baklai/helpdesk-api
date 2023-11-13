import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { UnitsService } from './units.service';
import { Unit } from './schemas/unit.schema';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Types } from 'mongoose';

@ApiTags('Units')
@Controller('units')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @Scopes(Scope.UnitCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.UnitCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Unit })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateUnitDto })
  async create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return await this.unitsService.create(createUnitDto);
  }

  @Get()
  @Scopes(Scope.UnitRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.UnitRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Unit] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Unit[]> {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.UnitRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.UnitRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Unit })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Unit> {
    return await this.unitsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.UnitUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.UnitUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Unit })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateUnitDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto
  ): Promise<Unit> {
    return await this.unitsService.updateOneById(id, updateUnitDto);
  }

  @Delete(':id')
  @Scopes(Scope.UnitDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.UnitDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Unit })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Unit> {
    return await this.unitsService.removeOneById(id);
  }
}
