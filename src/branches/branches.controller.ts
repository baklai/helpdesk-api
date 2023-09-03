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

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

import { BranchesService } from './branches.service';
import { Branch } from './schemas/branch.schema';
import { BranchDto } from './dto/branch.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @Roles(Role.CreateBranch)
  @ApiOperation({ summary: 'Create a new branch' })
  @ApiCreatedResponse({ description: 'Branch created successfully', type: BranchDto })
  @ApiConflictResponse({ description: 'A branch with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return await this.branchesService.create(createBranchDto);
  }

  @Get()
  @Roles(Role.ReadBranch)
  @ApiOperation({ summary: 'Get all branches' })
  @ApiOkResponse({ description: 'Success', type: [BranchDto] })
  async findAll(): Promise<Branch[]> {
    return await this.branchesService.findAll();
  }

  @Get(':id')
  @Roles(Role.ReadBranch)
  @ApiOperation({ summary: 'Get a branch by ID' })
  @ApiOkResponse({ description: 'Success', type: BranchDto })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  @ApiBadRequestResponse({ description: 'Invalid branch ID' })
  async findOneById(@Param('id') id: string): Promise<Branch> {
    return await this.branchesService.findOneById(id);
  }

  @Put(':id')
  @Roles(Role.UpdateBranch)
  @ApiOperation({ summary: 'Update a branch by ID' })
  @ApiOkResponse({ description: 'Branch updated successfully', type: BranchDto })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  @ApiConflictResponse({ description: 'A branch with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid branch ID' })
  async updateOneById(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto): Promise<Branch> {
    return await this.branchesService.updateOneById(id, updateBranchDto);
  }

  @Delete(':id')
  @Roles(Role.DeleteBranch)
  @ApiOperation({ summary: 'Delete a branch by ID' })
  @ApiOkResponse({ description: 'Branch deleted successfully', type: BranchDto })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  @ApiBadRequestResponse({ description: 'Invalid branch ID' })
  async removeOneById(@Param('id') id: string): Promise<Branch> {
    return await this.branchesService.removeOneById(id);
  }
}
