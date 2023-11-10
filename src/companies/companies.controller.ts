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

import { CompaniesService } from './companies.service';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Types } from 'mongoose';

@ApiTags('Companies')
@Controller('companies')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Scopes(Scope.CompanyCreate)
  @ApiOperation({
    summary: 'Create a new company',
    description: 'Required user scopes: [' + [Scope.CompanyCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Company created successfully', type: Company })
  @ApiConflictResponse({ description: 'A company with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Scopes(Scope.CompanyRead)
  @ApiOperation({
    summary: 'Get all companies',
    description: 'Required user scopes: [' + [Scope.CompanyRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Company] })
  async findAll(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.CompanyRead)
  @ApiOperation({
    summary: 'Get a company by ID',
    description: 'Required user scopes: [' + [Scope.CompanyRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Company })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'Invalid company ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Company> {
    return await this.companiesService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.CompanyUpdate)
  @ApiOperation({
    summary: 'Update a company by ID',
    description: 'Required user scopes: [' + [Scope.CompanyUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Company updated successfully', type: Company })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiConflictResponse({ description: 'A company with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid company ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    return await this.companiesService.updateOneById(id, updateCompanyDto);
  }

  @Delete(':id')
  @Scopes(Scope.CompanyDelete)
  @ApiOperation({
    summary: 'Delete a company by ID',
    description: 'Required user scopes: [' + [Scope.CompanyDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Company deleted successfully', type: Company })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'Invalid company ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Company> {
    return await this.companiesService.removeOneById(id);
  }
}
