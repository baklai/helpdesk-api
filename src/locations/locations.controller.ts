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
import { RolesGuard } from 'src/common/guards/roles.guard';

import { LocationsService } from './locations.service';
import { Location } from './schemas/location.schema';
import { LocationDto } from './dto/location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Locations')
@Controller('locations')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiCreatedResponse({ description: 'Location created successfully', type: LocationDto })
  @ApiConflictResponse({ description: 'A location with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return await this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiOkResponse({ description: 'Success', type: [LocationDto] })
  async findAll(): Promise<Location[]> {
    return await this.locationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiOkResponse({ description: 'Success', type: LocationDto })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async findOneById(@Param('id') id: string): Promise<Location> {
    return await this.locationsService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiOkResponse({ description: 'Location updated successfully', type: LocationDto })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiConflictResponse({ description: 'A location with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async updateOneById(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto): Promise<Location> {
    return await this.locationsService.updateOneById(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiOkResponse({ description: 'Location deleted successfully', type: LocationDto })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async removeOneById(@Param('id') id: string): Promise<Location> {
    return await this.locationsService.removeOneById(id);
  }
}
