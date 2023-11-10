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

import { PositionsService } from './positions.service';
import { Position } from './schemas/position.schema';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Types } from 'mongoose';

@ApiTags('Positions')
@Controller('positions')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @Scopes(Scope.PositionCreate)
  @ApiOperation({
    summary: 'Create a new position',
    description: 'Required user scopes: [' + [Scope.PositionCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Position created successfully', type: Position })
  @ApiConflictResponse({ description: 'A position with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return await this.positionsService.create(createPositionDto);
  }

  @Get()
  @Scopes(Scope.PositionRead)
  @ApiOperation({
    summary: 'Get all positions',
    description: 'Required user scopes: [' + [Scope.PositionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Position] })
  async findAll(): Promise<Position[]> {
    return await this.positionsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.PositionRead)
  @ApiOperation({
    summary: 'Get a position by ID',
    description: 'Required user scopes: [' + [Scope.PositionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Position })
  @ApiNotFoundResponse({ description: 'Position not found' })
  @ApiBadRequestResponse({ description: 'Invalid position ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Position> {
    return await this.positionsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.PositionUpdate)
  @ApiOperation({
    summary: 'Update a position by ID',
    description: 'Required user scopes: [' + [Scope.PositionUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Position updated successfully', type: Position })
  @ApiNotFoundResponse({ description: 'Position not found' })
  @ApiConflictResponse({ description: 'A position with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid position ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updatePositionDto: UpdatePositionDto
  ): Promise<Position> {
    return await this.positionsService.updateOneById(id, updatePositionDto);
  }

  @Delete(':id')
  @Scopes(Scope.PositionDelete)
  @ApiOperation({
    summary: 'Delete a position by ID',
    description: 'Required user scopes: [' + [Scope.PositionDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Position deleted successfully', type: Position })
  @ApiNotFoundResponse({ description: 'Position not found' })
  @ApiBadRequestResponse({ description: 'Invalid position ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Position> {
    return await this.positionsService.removeOneById(id);
  }
}
