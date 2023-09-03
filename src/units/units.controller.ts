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

import { UnitsService } from './units.service';
import { Unit } from './schemas/unit.schema';
import { UnitDto } from './dto/unit.dto';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('Units')
@Controller('units')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new unit' })
  @ApiCreatedResponse({ description: 'Unit created successfully', type: UnitDto })
  @ApiConflictResponse({ description: 'A unit with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return await this.unitsService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all units' })
  @ApiOkResponse({ description: 'Success', type: [UnitDto] })
  async findAll(): Promise<Unit[]> {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a unit by ID' })
  @ApiOkResponse({ description: 'Success', type: UnitDto })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiBadRequestResponse({ description: 'Invalid unit ID' })
  async findOneById(@Param('id') id: string): Promise<Unit> {
    return await this.unitsService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a unit by ID' })
  @ApiOkResponse({ description: 'Unit updated successfully', type: UnitDto })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiConflictResponse({ description: 'A unit with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid unit ID' })
  async updateOneById(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto): Promise<Unit> {
    return await this.unitsService.updateOneById(id, updateUnitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit by ID' })
  @ApiOkResponse({ description: 'Unit deleted successfully', type: UnitDto })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiBadRequestResponse({ description: 'Invalid unit ID' })
  async removeOneById(@Param('id') id: string): Promise<Unit> {
    return await this.unitsService.removeOneById(id);
  }
}
