import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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

import { ChannelsService } from './channels.service';
import { Channel } from './schemas/channel.schema';
import { ChannelDto } from './dto/channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PaginateChannelDto } from './dto/paginate-chennel.dto';

@ApiTags('Channels')
@Controller('channels')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class ChannelsController {
  constructor(private readonly channelService: ChannelsService) {}

  @Post()
  @Roles(Scope.ChannelCreate)
  @ApiOperation({ summary: 'Create a new channel' })
  @ApiCreatedResponse({ description: 'Channel created successfully', type: ChannelDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return await this.channelService.create(createChannelDto);
  }

  @Get()
  @Roles(Scope.ChannelRead)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all channels' })
  @ApiOkResponse({ description: 'Success', type: PaginateChannelDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Channel>> {
    return await this.channelService.findAll(query);
  }

  @Get(':id')
  @Roles(Scope.ChannelRead)
  @ApiOperation({ summary: 'Get a channel by ID' })
  @ApiOkResponse({ description: 'Success', type: ChannelDto })
  @ApiNotFoundResponse({ description: 'Channel not found' })
  @ApiBadRequestResponse({ description: 'Invalid channel ID' })
  async findOneById(@Param('id') id: string): Promise<Channel> {
    return await this.channelService.findOneById(id);
  }

  @Put(':id')
  @Roles(Scope.ChannelUpdate)
  @ApiOperation({ summary: 'Update a channel by ID' })
  @ApiOkResponse({ description: 'Channel updated successfully', type: ChannelDto })
  @ApiNotFoundResponse({ description: 'Channel not found' })
  @ApiBadRequestResponse({ description: 'Invalid channel ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto
  ): Promise<Channel> {
    return await this.channelService.updateOneById(id, updateChannelDto);
  }

  @Delete(':id')
  @Roles(Scope.ChannelDelete)
  @ApiOperation({ summary: 'Delete a channel by ID' })
  @ApiOkResponse({ description: 'Channel deleted successfully', type: ChannelDto })
  @ApiNotFoundResponse({ description: 'Channel not found' })
  @ApiBadRequestResponse({ description: 'Invalid channel ID' })
  async removeOneById(@Param('id') id: string): Promise<Channel> {
    return await this.channelService.removeOneById(id);
  }
}
