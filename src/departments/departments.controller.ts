import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { DepartmentsService } from './departments.service';
import { Department } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Відділи')
@Controller('departments')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Scopes(Scope.DepartmentCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.DepartmentCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Department })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiConflictResponse({ description: 'Конфлікт даних' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateDepartmentDto })
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Scopes(Scope.DepartmentRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.DepartmentRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: [Department] })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.DepartmentRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.DepartmentRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Department })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findOneById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.DepartmentUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.DepartmentUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Department })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiConflictResponse({ description: 'Конфлікт даних' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateDepartmentDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<Department> {
    return await this.departmentsService.updateOneById(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Scopes(Scope.DepartmentDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.DepartmentDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Department })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.removeOneById(id);
  }
}
