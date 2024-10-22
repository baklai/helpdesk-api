import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { Scope } from 'src/common/enums/scope.enum';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { PingsService } from './pings.service';
import { CreatePingDto } from './dto/create-ping.dto';
import { Ping, PaginatePing } from './schemas/ping.schema';

@ApiTags('Пінг-сервіс')
@Controller('pings')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class PingsController {
  constructor(private readonly pingsService: PingsService) {}

  @Post()
  @Scopes(Scope.PingCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.PingCreate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ping })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreatePingDto })
  async create(@Body() createPingDto: CreatePingDto): Promise<Ping> {
    return await this.pingsService.create(createPingDto);
  }

  @Get()
  @Scopes(Scope.PingRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.PingRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: PaginatePing })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Ping>> {
    return await this.pingsService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.PingRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.PingRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ping })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  async findOneById(@Param('id') id: string, @Query('populate') populate: boolean): Promise<Ping> {
    return await this.pingsService.findOneById(id, populate);
  }

  @Delete(':id')
  @Scopes(Scope.PingDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.PingDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ping })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Ping> {
    return await this.pingsService.removeOneById(id);
  }
}
