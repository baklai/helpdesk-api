import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';

@ApiTags('Події')
@Controller('events')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  @Scopes(Scope.EventCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.EventCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Event })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateEventDto })
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventService.create(createEventDto);
  }

  @Get()
  @Scopes(Scope.EventRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.EventRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: [Event] })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: QueryEventDto): Promise<Event[]> {
    return await this.eventService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.EventRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.EventRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Event })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findOneById(@Param('id') id: string): Promise<Event> {
    return await this.eventService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.EventUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.EventUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Event })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateEventDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<Event> {
    return await this.eventService.updateOneById(id, updateEventDto);
  }

  @Delete(':id')
  @Scopes(Scope.EventDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.EventUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Event })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Event> {
    return await this.eventService.removeOneById(id);
  }
}
