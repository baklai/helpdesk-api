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

import { PositionsService } from './positions.service';
import { Position } from './schemas/position.schema';
import { PositionDto } from './dto/position.dto';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('Positions')
@Controller('positions')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new position' })
  @ApiCreatedResponse({ description: 'Position created successfully', type: PositionDto })
  @ApiConflictResponse({ description: 'A position with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return await this.positionsService.create(createPositionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all positions' })
  @ApiOkResponse({ description: 'Success', type: [PositionDto] })
  async findAll(): Promise<Position[]> {
    return await this.positionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a position by ID' })
  @ApiOkResponse({ description: 'Success', type: PositionDto })
  @ApiNotFoundResponse({ description: 'Position not found' })
  @ApiBadRequestResponse({ description: 'Invalid position ID' })
  async findOneById(@Param('id') id: string): Promise<Position> {
    return await this.positionsService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a position by ID' })
  @ApiOkResponse({ description: 'Position updated successfully', type: PositionDto })
  @ApiNotFoundResponse({ description: 'Position not found' })
  @ApiConflictResponse({ description: 'A position with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid position ID' })
  async updateOneById(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto): Promise<Position> {
    return await this.positionsService.updateOneById(id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a position by ID' })
  @ApiOkResponse({ description: 'Position deleted successfully', type: PositionDto })
  @ApiNotFoundResponse({ description: 'Position not found' })
  @ApiBadRequestResponse({ description: 'Invalid position ID' })
  async removeOneById(@Param('id') id: string): Promise<Position> {
    return await this.positionsService.removeOneById(id);
  }
}
