import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

import { BranchesService } from './branches.service';
import { Branch } from './schemas/branch.schema';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Types } from 'mongoose';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @Scopes(Scope.BranchCreate)
  @ApiOperation({
    summary: 'Create a new branch',
    description: 'Required user scopes: [' + [Scope.BranchCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Branch created successfully', type: Branch })
  @ApiConflictResponse({ description: 'A branch with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return await this.branchesService.create(createBranchDto);
  }

  @Get()
  @Scopes(Scope.BranchRead)
  @ApiOperation({
    summary: 'Get all branches',
    description: 'Required user scopes: [' + [Scope.BranchRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Branch] })
  async findAll(): Promise<Branch[]> {
    return await this.branchesService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.BranchRead)
  @ApiOperation({
    summary: 'Get a branch by ID',
    description: 'Required user scopes: [' + [Scope.BranchRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Branch })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  @ApiBadRequestResponse({ description: 'Invalid branch ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Branch> {
    return await this.branchesService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.BranchUpdate)
  @ApiOperation({
    summary: 'Update a branch by ID',
    description: 'Required user scopes: [' + [Scope.BranchUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Branch updated successfully', type: Branch })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  @ApiConflictResponse({ description: 'A branch with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid branch ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateBranchDto: UpdateBranchDto
  ): Promise<Branch> {
    return await this.branchesService.updateOneById(id, updateBranchDto);
  }

  @Delete(':id')
  @Scopes(Scope.BranchDelete)
  @ApiOperation({
    summary: 'Delete a branch by ID',
    description: 'Required user scopes: [' + [Scope.BranchDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Branch deleted successfully', type: Branch })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  @ApiBadRequestResponse({ description: 'Invalid branch ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Branch> {
    return await this.branchesService.removeOneById(id);
  }
}
