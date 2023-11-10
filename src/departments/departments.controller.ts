import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
import { Types } from 'mongoose';

@ApiTags('Departments')
@Controller('departments')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Scopes(Scope.DepartmentCreate)
  @ApiOperation({
    summary: 'Create a new department',
    description: 'Required user scopes: [' + [Scope.DepartmentCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Department created successfully', type: Department })
  @ApiConflictResponse({ description: 'A department with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Scopes(Scope.DepartmentRead)
  @ApiOperation({
    summary: 'Get all departments',
    description: 'Required user scopes: [' + [Scope.DepartmentRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Department] })
  async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.DepartmentRead)
  @ApiOperation({
    summary: 'Get a department by ID',
    description: 'Required user scopes: [' + [Scope.DepartmentRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Department })
  @ApiNotFoundResponse({ description: 'Department not found' })
  @ApiBadRequestResponse({ description: 'Invalid department ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Department> {
    return await this.departmentsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.DepartmentUpdate)
  @ApiOperation({
    summary: 'Update a department by ID',
    description: 'Required user scopes: [' + [Scope.DepartmentUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Department updated successfully', type: Department })
  @ApiNotFoundResponse({ description: 'Department not found' })
  @ApiConflictResponse({ description: 'A department with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid department ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<Department> {
    return await this.departmentsService.updateOneById(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Scopes(Scope.DepartmentDelete)
  @ApiOperation({
    summary: 'Delete a department by ID',
    description: 'Required user scopes: [' + [Scope.DepartmentDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Department deleted successfully', type: Department })
  @ApiNotFoundResponse({ description: 'Department not found' })
  @ApiBadRequestResponse({ description: 'Invalid department ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Department> {
    return await this.departmentsService.removeOneById(id);
  }
}
