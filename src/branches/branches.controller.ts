import { Get, Put, Post, Body, Param, Delete, UseGuards, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';

import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { BranchesService } from './branches.service';
import { Branch } from './schemas/branch.schema';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @Scopes(Scope.BranchCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.BranchCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Branch })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateBranchDto })
  async create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return await this.branchesService.create(createBranchDto);
  }

  @Get()
  @Scopes(Scope.BranchRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.BranchRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Branch] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Branch[]> {
    return await this.branchesService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.BranchRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.BranchRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Branch })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Branch> {
    return await this.branchesService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.BranchUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.BranchUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Branch })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateBranchDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto
  ): Promise<Branch> {
    return await this.branchesService.updateOneById(id, updateBranchDto);
  }

  @Delete(':id')
  @Scopes(Scope.BranchDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.BranchDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Branch })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Branch> {
    return await this.branchesService.removeOneById(id);
  }
}
