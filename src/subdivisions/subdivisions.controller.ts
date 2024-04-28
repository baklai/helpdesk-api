import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';

import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';

import { SubdivisionsService } from './subdivisions.service';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { UpdateSubdivisionDto } from './dto/update-subdivision.dto';
import { Subdivision } from './schemas/subdivision.schema';

@ApiTags('Subdivisions')
@Controller('subdivisions')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class SubdivisionsController {
  constructor(private readonly subdivisionsService: SubdivisionsService) {}

  @Post()
  @Scopes(Scope.SubdivisionCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.SubdivisionCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateSubdivisionDto })
  async create(@Body() createSubdivisionDto: CreateSubdivisionDto): Promise<Subdivision> {
    return await this.subdivisionsService.create(createSubdivisionDto);
  }

  @Get()
  @Scopes(Scope.SubdivisionRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.SubdivisionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Subdivision] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Subdivision[]> {
    return await this.subdivisionsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.SubdivisionRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.SubdivisionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Subdivision> {
    return await this.subdivisionsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.SubdivisionUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.SubdivisionUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateSubdivisionDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateSubdivisionDto: UpdateSubdivisionDto
  ): Promise<Subdivision> {
    return await this.subdivisionsService.updateOneById(id, updateSubdivisionDto);
  }

  @Delete(':id')
  @Scopes(Scope.SubdivisionDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.SubdivisionDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Subdivision> {
    return await this.subdivisionsService.removeOneById(id);
  }
}
