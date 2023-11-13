import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { EnterprisesService } from './enterprises.service';
import { Enterprise } from './schemas/enterprise.schema';
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
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.EnterpriseCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Enterprise })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateEnterpriseDto })
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto): Promise<Enterprise> {
    return await this.enterprisesService.create(createEnterpriseDto);
  }

  @Get()
  @Scopes(Scope.EnterpriseRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.EnterpriseRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Enterprise] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Enterprise[]> {
    return await this.enterprisesService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.EnterpriseRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.EnterpriseRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Enterprise })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Enterprise> {
    return await this.enterprisesService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.EnterpriseUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.EnterpriseUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Enterprise })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateEnterpriseDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto
  ): Promise<Enterprise> {
    return await this.enterprisesService.updateOneById(id, updateEnterpriseDto);
  }

  @Delete(':id')
  @Scopes(Scope.EnterpriseDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.EnterpriseDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Enterprise })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Enterprise> {
    return await this.enterprisesService.removeOneById(id);
  }
}
