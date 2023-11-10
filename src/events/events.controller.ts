import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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

import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import { Types } from 'mongoose';

@ApiTags('Events')
@Controller('events')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  @Scopes(Scope.EventCreate)
  @ApiOperation({
    summary: 'Create a new event',
    description: 'Required user scopes: [' + [Scope.EventCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Event created successfully', type: Event })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventService.create(createEventDto);
  }

  @Get()
  @Scopes(Scope.EventRead)
  @ApiOperation({
    summary: 'Get all events',
    description: 'Required user scopes: [' + [Scope.EventRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Event] })
  async findAll(@Query() query: QueryEventDto): Promise<Event[]> {
    return await this.eventService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.EventRead)
  @ApiOperation({
    summary: 'Get an event by ID',
    description: 'Required user scopes: [' + [Scope.EventRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid event ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Event> {
    return await this.eventService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.EventUpdate)
  @ApiOperation({
    summary: 'Update an event by ID',
    description: 'Required user scopes: [' + [Scope.EventUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Event updated successfully', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid event ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<Event> {
    return await this.eventService.updateOneById(id, updateEventDto);
  }

  @Delete(':id')
  @Scopes(Scope.EventDelete)
  @ApiOperation({
    summary: 'Delete an event by ID',
    description: 'Required user scopes: [' + [Scope.EventUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Event deleted successfully', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid event ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Event> {
    return await this.eventService.removeOneById(id);
  }
}
