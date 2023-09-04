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
import { RolesGuard } from 'src/common/guards/scopes.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { CompaniesService } from './companies.service';
import { Company } from './schemas/company.schema';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Companies')
@Controller('companies')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles(Scope.CompanyCreate)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiCreatedResponse({ description: 'Company created successfully', type: CompanyDto })
  @ApiConflictResponse({ description: 'A company with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Roles(Scope.CompanyRead)
  @ApiOperation({ summary: 'Get all companies' })
  @ApiOkResponse({ description: 'Success', type: [CompanyDto] })
  async findAll(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }

  @Get(':id')
  @Roles(Scope.CompanyRead)
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiOkResponse({ description: 'Success', type: CompanyDto })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'Invalid company ID' })
  async findOneById(@Param('id') id: string): Promise<Company> {
    return await this.companiesService.findOneById(id);
  }

  @Put(':id')
  @Roles(Scope.CompanyUpdate)
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiOkResponse({ description: 'Company updated successfully', type: CompanyDto })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiConflictResponse({ description: 'A company with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid company ID' })
  async updateOneById(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return await this.companiesService.updateOneById(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles(Scope.CompanyDelete)
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiOkResponse({ description: 'Company deleted successfully', type: CompanyDto })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'Invalid company ID' })
  async removeOneById(@Param('id') id: string): Promise<Company> {
    return await this.companiesService.removeOneById(id);
  }
}
