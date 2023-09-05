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
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/scopes.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginateUserDto } from './dto/paginate-user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Roles(Scope.UserCreate)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User created successfully', type: UserDto })
  @ApiConflictResponse({ description: 'A user with the same login already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Scope.UserRead)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Success', type: PaginateUserDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<User>> {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(Scope.UserRead)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Put(':id')
  @Roles(Scope.UserUpdate)
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiOkResponse({ description: 'User updated successfully', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.userService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Scope.UserDelete)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiOkResponse({ description: 'User deleted successfully', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  async removeOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.removeOneById(id);
  }
}
