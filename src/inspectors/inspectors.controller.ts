import { Ip, Get, Post, Body, Param, Delete, Query, UseGuards, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AdminGuard } from 'src/common/guards/administrator.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { InspectorsService } from './inspectors.service';
import { Inspector, PaginateInspector } from './schemas/inspector.schema';

@ApiTags('ПК SysInspectors')
@Controller('inspectors')
export class InspectorsController {
  constructor(private readonly inspectorService: InspectorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: []'
  })
  @ApiExcludeEndpoint()
  @ApiCreatedResponse({ description: 'Успіх' })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async create(
    @Ip() ip: string,
    @Query() query: Record<string, any>,
    @Body() createInspectorDto: Record<string, any>
  ) {
    return await this.inspectorService.create(ip, query.field, createInspectorDto);
  }

  @Get()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: PaginateInspector })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Inspector>> {
    return await this.inspectorService.findAll(query);
  }

  @Get('find')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Отримати запис за полем',
    description: 'Необхідні дозволи: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Inspector })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiQuery({ name: 'host', description: 'Значення поля', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'Сукупні записи', type: Boolean })
  async findOneByHost(@Param('host') host: string): Promise<Inspector> {
    return await this.inspectorService.findOneByHost(host);
  }

  @Get(':id')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Inspector })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'Сукупні записи', type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean,
    @Query('aggregate') aggregate: boolean
  ): Promise<Inspector> {
    return await this.inspectorService.findOneById(id, populate, aggregate);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, AdminGuard)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Потрібені права адміністратора'
  })
  @ApiOkResponse({ description: 'Успіх', type: Inspector })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Inspector> {
    return await this.inspectorService.removeOneById(id);
  }
}
