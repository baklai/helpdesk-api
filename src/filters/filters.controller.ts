import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { FiltersService } from './filters.service';
import { Filter } from './schemas/filter.schema';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { QueryFilterDto } from './dto/query-filter.dto';

@ApiTags('Фільтри')
@Controller('filters')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post()
  @Scopes(Scope.FilterCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.FilterCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Filter })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateFilterDto })
  async create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
    return await this.filtersService.create(createFilterDto);
  }

  @Get()
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: [Filter] })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: QueryFilterDto): Promise<Filter[]> {
    return await this.filtersService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.FilterRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.FilterRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Filter })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findOneById(@Param('id') id: string): Promise<Filter> {
    return await this.filtersService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.FilterUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.FilterUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Filter })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateFilterDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateFilterDto: UpdateFilterDto
  ): Promise<Filter> {
    return await this.filtersService.updateOneById(id, updateFilterDto);
  }

  @Delete(':id')
  @Scopes(Scope.FilterDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.FilterDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Filter })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Filter> {
    return await this.filtersService.removeOneById(id);
  }
}
