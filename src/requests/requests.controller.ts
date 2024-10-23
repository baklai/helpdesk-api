import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { RequestsService } from './requests.service';
import { PaginateRequest, Request } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@ApiTags('Запити в службу підтримки')
@Controller('requests')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Scopes(Scope.RequestCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.RequestCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Request })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateRequestDto })
  async create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestsService.create(createRequestDto);
  }

  @Get()
  @Scopes(Scope.RequestRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.RequestRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: PaginateRequest })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Request>> {
    return await this.requestsService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.RequestRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.RequestRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Request })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'Сукупні записи', type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean,
    @Query('aggregate') aggregate: boolean
  ): Promise<Request> {
    return await this.requestsService.findOneById(id, populate, aggregate);
  }

  @Put(':id')
  @Scopes(Scope.RequestUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.RequestUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Request })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateRequestDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto
  ): Promise<Request> {
    return await this.requestsService.updateOneById(id, updateRequestDto);
  }

  @Delete(':id')
  @Scopes(Scope.RequestDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.RequestDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Request })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Request> {
    return await this.requestsService.removeOneById(id);
  }
}
