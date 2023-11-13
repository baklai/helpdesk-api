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
import { PositionsService } from './positions.service';
import { Position } from './schemas/position.schema';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@ApiTags('Positions')
@Controller('positions')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @Scopes(Scope.PositionCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.PositionCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Position })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreatePositionDto })
  async create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return await this.positionsService.create(createPositionDto);
  }

  @Get()
  @Scopes(Scope.PositionRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.PositionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Position] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Position[]> {
    return await this.positionsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.PositionRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.PositionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Position })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Position> {
    return await this.positionsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.PositionUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.PositionUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Position })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdatePositionDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ): Promise<Position> {
    return await this.positionsService.updateOneById(id, updatePositionDto);
  }

  @Delete(':id')
  @Scopes(Scope.PositionDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.PositionDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Position })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Position> {
    return await this.positionsService.removeOneById(id);
  }
}
