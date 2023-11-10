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

import { LocationsService } from './locations.service';
import { Location } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Types } from 'mongoose';

@ApiTags('Locations')
@Controller('locations')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @Scopes(Scope.LocationCreate)
  @ApiOperation({
    summary: 'Create a new location',
    description: 'Required user scopes: [' + [Scope.LocationCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Location created successfully', type: Location })
  @ApiConflictResponse({ description: 'A location with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return await this.locationsService.create(createLocationDto);
  }

  @Get()
  @Scopes(Scope.LocationRead)
  @ApiOperation({
    summary: 'Get all locations',
    description: 'Required user scopes: [' + [Scope.LocationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Location] })
  async findAll(): Promise<Location[]> {
    return await this.locationsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.LocationRead)
  @ApiOperation({
    summary: 'Get a location by ID',
    description: 'Required user scopes: [' + [Scope.LocationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Location })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Location> {
    return await this.locationsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.LocationUpdate)
  @ApiOperation({
    summary: 'Update a location by ID',
    description: 'Required user scopes: [' + [Scope.LocationUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Location updated successfully', type: Location })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiConflictResponse({ description: 'A location with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateLocationDto: UpdateLocationDto
  ): Promise<Location> {
    return await this.locationsService.updateOneById(id, updateLocationDto);
  }

  @Delete(':id')
  @Scopes(Scope.LocationDelete)
  @ApiOperation({
    summary: 'Delete a location by ID',
    description: 'Required user scopes: [' + [Scope.LocationDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Location deleted successfully', type: Location })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Location> {
    return await this.locationsService.removeOneById(id);
  }
}
