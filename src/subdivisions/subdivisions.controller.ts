import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';

import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';

import { SubdivisionsService } from './subdivisions.service';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { UpdateSubdivisionDto } from './dto/update-subdivision.dto';
import { Subdivision } from './schemas/subdivision.schema';

@ApiTags('Підрозділи')
@Controller('subdivisions')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class SubdivisionsController {
  constructor(private readonly subdivisionsService: SubdivisionsService) {}

  @Post()
  @Scopes(Scope.SubdivisionCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.SubdivisionCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiConflictResponse({ description: 'Конфлікт даних' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateSubdivisionDto })
  async create(@Body() createSubdivisionDto: CreateSubdivisionDto): Promise<Subdivision> {
    return await this.subdivisionsService.create(createSubdivisionDto);
  }

  @Get()
  @Scopes(Scope.SubdivisionRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.SubdivisionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: [Subdivision] })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(): Promise<Subdivision[]> {
    return await this.subdivisionsService.findAll();
  }

  @Get('organization/:id')
  @Scopes(Scope.SubdivisionRead)
  @ApiOperation({
    summary: 'Отримати всі записи за ідентифікатором організації',
    description: 'Необхідні дозволи: [' + [Scope.SubdivisionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: [Subdivision] })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findAllByOrganizationId(@Param('id') id: string): Promise<Subdivision[]> {
    return await this.subdivisionsService.findAllByOrganizationId(id);
  }

  @Get(':id')
  @Scopes(Scope.SubdivisionRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.SubdivisionRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findOneById(@Param('id') id: string): Promise<Subdivision> {
    return await this.subdivisionsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.SubdivisionUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.SubdivisionUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiConflictResponse({ description: 'Конфлікт даних' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateSubdivisionDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateSubdivisionDto: UpdateSubdivisionDto
  ): Promise<Subdivision> {
    return await this.subdivisionsService.updateOneById(id, updateSubdivisionDto);
  }

  @Delete(':id')
  @Scopes(Scope.SubdivisionDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.SubdivisionDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Subdivision })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Subdivision> {
    return await this.subdivisionsService.removeOneById(id);
  }
}
