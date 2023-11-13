import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
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
import { CompaniesService } from './companies.service';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Companies')
@Controller('companies')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Scopes(Scope.CompanyCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.CompanyCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Company })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateCompanyDto })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Scopes(Scope.CompanyRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.CompanyRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Company] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.CompanyRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.CompanyRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Company })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Company> {
    return await this.companiesService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.CompanyUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.CompanyUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Company })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateCompanyDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    return await this.companiesService.updateOneById(id, updateCompanyDto);
  }

  @Delete(':id')
  @Scopes(Scope.CompanyDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.CompanyDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Company })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Company> {
    return await this.companiesService.removeOneById(id);
  }
}
