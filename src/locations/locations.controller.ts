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
import { LocationsService } from './locations.service';
import { Location } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Locations')
@Controller('locations')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @Scopes(Scope.LocationCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.LocationCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Location })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateLocationDto })
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return await this.locationsService.create(createLocationDto);
  }

  @Get()
  @Scopes(Scope.LocationRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.LocationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Location] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Location[]> {
    return await this.locationsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.LocationRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.LocationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Location })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Location> {
    return await this.locationsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.LocationUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.LocationUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Location })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateLocationDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto
  ): Promise<Location> {
    return await this.locationsService.updateOneById(id, updateLocationDto);
  }

  @Delete(':id')
  @Scopes(Scope.LocationDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.LocationDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Location })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Location> {
    return await this.locationsService.removeOneById(id);
  }
}
