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

@ApiTags('Departments')
@Controller('departments')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Scopes(Scope.DepartmentCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.DepartmentCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Department })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateDepartmentDto })
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Scopes(Scope.DepartmentRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.DepartmentRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Department] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.DepartmentRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.DepartmentRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Department })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.DepartmentUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.DepartmentUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Department })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateDepartmentDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<Department> {
    return await this.departmentsService.updateOneById(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Scopes(Scope.DepartmentDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.DepartmentDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Department })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.removeOneById(id);
  }
}
