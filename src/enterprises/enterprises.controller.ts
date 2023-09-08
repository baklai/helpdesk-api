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

import { EnterprisesService } from './enterprises.service';
import { Enterprise } from './schemas/enterprise.schema';
import { EnterpriseDto } from './dto/enterprise.dto';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@ApiTags('Enterprises')
@Controller('enterprises')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Post()
  @Scopes(Scope.EnterpriseCreate)
  @ApiOperation({
    summary: 'Create a new enterprise',
    description: 'Required user scopes: [' + [Scope.EnterpriseCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Enterprise created successfully', type: EnterpriseDto })
  @ApiConflictResponse({ description: 'A enterprise with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto): Promise<Enterprise> {
    return await this.enterprisesService.create(createEnterpriseDto);
  }

  @Get()
  @Scopes(Scope.EnterpriseRead)
  @ApiOperation({
    summary: 'Get all enterprise',
    description: 'Required user scopes: [' + [Scope.EnterpriseRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [EnterpriseDto] })
  async findAll(): Promise<Enterprise[]> {
    return await this.enterprisesService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.EnterpriseRead)
  @ApiOperation({
    summary: 'Get a enterprise by ID',
    description: 'Required user scopes: [' + [Scope.EnterpriseRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: EnterpriseDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiBadRequestResponse({ description: 'Invalid enterprise ID' })
  async findOneById(@Param('id') id: string): Promise<Enterprise> {
    return await this.enterprisesService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.EnterpriseUpdate)
  @ApiOperation({
    summary: 'Update a enterprise by ID',
    description: 'Required user scopes: [' + [Scope.EnterpriseUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Enterprise updated successfully', type: EnterpriseDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiConflictResponse({ description: 'A enterprise with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid enterprise ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto
  ): Promise<Enterprise> {
    return await this.enterprisesService.updateOneById(id, updateEnterpriseDto);
  }

  @Delete(':id')
  @Scopes(Scope.EnterpriseDelete)
  @ApiOperation({
    summary: 'Delete a enterprise by ID',
    description: 'Required user scopes: [' + [Scope.EnterpriseDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Enterprise deleted successfully', type: EnterpriseDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiBadRequestResponse({ description: 'Invalid enterprise ID' })
  async removeOneById(@Param('id') id: string): Promise<Enterprise> {
    return await this.enterprisesService.removeOneById(id);
  }
}
