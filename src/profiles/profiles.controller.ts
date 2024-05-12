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
import { AdminGuard } from 'src/common/guards/administrator.guard';
import { AdminRequired } from 'src/common/decorators/admin.decorator';

import { ProfilesService } from './profiles.service';
import { PaginateProfile, Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profiles')
@Controller('profiles')
@ApiBearerAuth('JWT Guard')
@AdminRequired()
@UseGuards(AccessTokenGuard, AdminGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required admin'
  })
  @ApiCreatedResponse({ description: 'Success', type: Profile })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateProfileDto })
  async create(@Body() createUserDto: CreateProfileDto): Promise<Profile> {
    return await this.profilesService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required admin'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateProfile })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Profile>> {
    return await this.profilesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required admin'
  })
  @ApiOkResponse({ description: 'Success', type: Profile })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Profile> {
    return await this.profilesService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required admin'
  })
  @ApiOkResponse({ description: 'Success', type: Profile })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateProfileDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<Profile> {
    return await this.profilesService.updateOneById(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required admin'
  })
  @ApiOkResponse({ description: 'Success', type: Profile })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Profile> {
    return await this.profilesService.removeOneById(id);
  }
}
