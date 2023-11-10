import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
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
import { PaginateResult, Types } from 'mongoose';

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
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Scopes(Scope.UserCreate)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Required user scopes: [' + [Scope.UserCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'User created successfully', type: User })
  @ApiConflictResponse({ description: 'A user with the same login already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Scopes(Scope.UserRead)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Required user scopes: [' + [Scope.UserRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateUser })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<User>> {
    return await this.userService.findAll(query);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get public data of users' })
  @ApiOkResponse({ description: 'Success', type: User })
  async findAllMe(): Promise<User[]> {
    return await this.userService.findAllMe();
  }

  @Get(':id')
  @Scopes(Scope.UserRead)
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Required user scopes: [' + [Scope.UserRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.UserUpdate)
  @ApiOperation({
    summary: 'Update a user by ID',
    description: 'Required user scopes: [' + [Scope.UserUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'User updated successfully', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.userService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  @Scopes(Scope.UserDelete)
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'Required user scopes: [' + [Scope.UserDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'User deleted successfully', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<User> {
    return await this.userService.removeOneById(id);
  }
}
