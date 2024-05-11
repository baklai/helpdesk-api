import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { UsersService } from './users.service';
import { PaginateUser, User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Scopes(Scope.UserCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.UserCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Scopes(Scope.UserRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.UserRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateUser })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<User>> {
    return await this.usersService.findAll(query);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get public data of records',
    description: 'Required scopes: []'
  })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAllMe(): Promise<User[]> {
    return await this.usersService.findAllMe();
  }

  @Get(':id')
  @Scopes(Scope.UserRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.UserRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.UserUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.UserUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateUserDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.usersService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  @Scopes(Scope.UserDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.UserDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeOneById(id);
  }
}
