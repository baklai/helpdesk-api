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

import { DepartmentsService } from './departments.service';
import { Department } from './schemas/department.schema';
import { DepartmentDto } from './dto/department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('Departments')
@Controller('departments')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiCreatedResponse({ description: 'Department created successfully', type: DepartmentDto })
  @ApiConflictResponse({ description: 'A department with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiOkResponse({ description: 'Success', type: [DepartmentDto] })
  async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a department by ID' })
  @ApiOkResponse({ description: 'Success', type: DepartmentDto })
  @ApiNotFoundResponse({ description: 'Department not found' })
  @ApiBadRequestResponse({ description: 'Invalid department ID' })
  async findOneById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a department by ID' })
  @ApiOkResponse({ description: 'Department updated successfully', type: DepartmentDto })
  @ApiNotFoundResponse({ description: 'Department not found' })
  @ApiConflictResponse({ description: 'A department with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid department ID' })
  async updateOneById(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    return await this.departmentsService.updateOneById(id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department by ID' })
  @ApiOkResponse({ description: 'Department deleted successfully', type: DepartmentDto })
  @ApiNotFoundResponse({ description: 'Department not found' })
  @ApiBadRequestResponse({ description: 'Invalid department ID' })
  async removeOneById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.removeOneById(id);
  }
}
