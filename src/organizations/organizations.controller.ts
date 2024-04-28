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

@ApiTags('Organizations')
@Controller('organizations')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @Scopes(Scope.OrganizationCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.OrganizationCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Organization })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateOrganizationDto })
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @Scopes(Scope.OrganizationRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.OrganizationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Organization] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Organization[]> {
    return await this.organizationsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.OrganizationRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.OrganizationRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Organization })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Organization> {
    return await this.organizationsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.OrganizationUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.OrganizationUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Organization })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateOrganizationDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ): Promise<Organization> {
    return await this.organizationsService.updateOneById(id, updateOrganizationDto);
  }

  @Delete(':id')
  @Scopes(Scope.OrganizationDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.OrganizationDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Organization })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Organization> {
    return await this.organizationsService.removeOneById(id);
  }
}
