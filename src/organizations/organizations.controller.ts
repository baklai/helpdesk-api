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

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './schemas/organization.schema';

@ApiTags('Організації')
@Controller('organizations')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @Scopes(Scope.OrganizationCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.OrganizationCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Organization })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiConflictResponse({ description: 'Конфлікт даних' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateOrganizationDto })
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @Scopes(Scope.OrganizationRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.OrganizationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: [Organization] })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(): Promise<Organization[]> {
    return await this.organizationsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.OrganizationRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.OrganizationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Organization })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findOneById(@Param('id') id: string): Promise<Organization> {
    return await this.organizationsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.OrganizationUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.OrganizationUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Organization })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiConflictResponse({ description: 'Конфлікт даних' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateOrganizationDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ): Promise<Organization> {
    return await this.organizationsService.updateOneById(id, updateOrganizationDto);
  }

  @Delete(':id')
  @Scopes(Scope.OrganizationDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.OrganizationDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Organization })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Organization> {
    return await this.organizationsService.removeOneById(id);
  }
}
