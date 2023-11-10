import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
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
    summary: 'Create a new unit',
    description: 'Required user scopes: [' + [Scope.UnitCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Unit created successfully', type: Unit })
  @ApiConflictResponse({ description: 'A unit with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return await this.unitsService.create(createUnitDto);
  }

  @Get()
  @Scopes(Scope.UnitRead)
  @ApiOperation({
    summary: 'Get all units',
    description: 'Required user scopes: [' + [Scope.UnitRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Unit] })
  async findAll(): Promise<Unit[]> {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.UnitRead)
  @ApiOperation({
    summary: 'Get a unit by ID',
    description: 'Required user scopes: [' + [Scope.UnitRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Unit })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiBadRequestResponse({ description: 'Invalid unit ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Unit> {
    return await this.unitsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.UnitUpdate)
  @ApiOperation({
    summary: 'Update a unit by ID',
    description: 'Required user scopes: [' + [Scope.UnitUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Unit updated successfully', type: Unit })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiConflictResponse({ description: 'A unit with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid unit ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateUnitDto: UpdateUnitDto
  ): Promise<Unit> {
    return await this.unitsService.updateOneById(id, updateUnitDto);
  }

  @Delete(':id')
  @Scopes(Scope.UnitDelete)
  @ApiOperation({
    summary: 'Delete a unit by ID',
    description: 'Required user scopes: [' + [Scope.UnitDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Unit deleted successfully', type: Unit })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiBadRequestResponse({ description: 'Invalid unit ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Unit> {
    return await this.unitsService.removeOneById(id);
  }
}
