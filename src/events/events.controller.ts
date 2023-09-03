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

import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';
import { EventDto } from './dto/event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('Events')
@Controller('events')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiCreatedResponse({ description: 'Event created successfully', type: EventDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiOkResponse({ description: 'Success', type: [EventDto] })
  async findAll(@Query() query: QueryEventDto): Promise<Event[]> {
    return await this.eventService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiOkResponse({ description: 'Success', type: EventDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid event ID' })
  async findOneById(@Param('id') id: string): Promise<Event> {
    return await this.eventService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiOkResponse({ description: 'Event updated successfully', type: EventDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid event ID' })
  async updateOneById(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return await this.eventService.updateOneById(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiOkResponse({ description: 'Event deleted successfully', type: EventDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid event ID' })
  async removeOneById(@Param('id') id: string): Promise<Event> {
    return await this.eventService.removeOneById(id);
  }
}
