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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

import { EnterprisesService } from './enterprises.service';
import { Enterprise } from './schemas/enterprise.schema';
import { EnterpriseDto } from './dto/enterprise.dto';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@ApiTags('Enterprises')
@Controller('enterprises')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Post()
  @Roles(Role.EnterpriseCreate)
  @ApiOperation({ summary: 'Create a new enterprise' })
  @ApiCreatedResponse({ description: 'Enterprise created successfully', type: EnterpriseDto })
  @ApiConflictResponse({ description: 'A enterprise with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto): Promise<Enterprise> {
    return await this.enterprisesService.create(createEnterpriseDto);
  }

  @Get()
  @Roles(Role.EnterpriseRead)
  @ApiOperation({ summary: 'Get all enterprise' })
  @ApiOkResponse({ description: 'Success', type: [EnterpriseDto] })
  async findAll(): Promise<Enterprise[]> {
    return await this.enterprisesService.findAll();
  }

  @Get(':id')
  @Roles(Role.EnterpriseRead)
  @ApiOperation({ summary: 'Get a enterprise by ID' })
  @ApiOkResponse({ description: 'Success', type: EnterpriseDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiBadRequestResponse({ description: 'Invalid enterprise ID' })
  async findOneById(@Param('id') id: string): Promise<Enterprise> {
    return await this.enterprisesService.findOneById(id);
  }

  @Put(':id')
  @Roles(Role.EnterpriseUpdate)
  @ApiOperation({ summary: 'Update a enterprise by ID' })
  @ApiOkResponse({ description: 'Enterprise updated successfully', type: EnterpriseDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiConflictResponse({ description: 'A enterprise with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid enterprise ID' })
  async updateOneById(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto): Promise<Enterprise> {
    return await this.enterprisesService.updateOneById(id, updateEnterpriseDto);
  }

  @Delete(':id')
  @Roles(Role.EnterpriseDelete)
  @ApiOperation({ summary: 'Delete a enterprise by ID' })
  @ApiOkResponse({ description: 'Enterprise deleted successfully', type: EnterpriseDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiBadRequestResponse({ description: 'Invalid enterprise ID' })
  async removeOneById(@Param('id') id: string): Promise<Enterprise> {
    return await this.enterprisesService.removeOneById(id);
  }
}
