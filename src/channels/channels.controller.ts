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
import { PaginateResult, Types } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { ChannelsService } from './channels.service';
import { Channel, PaginateChannel } from './schemas/channel.schema';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@ApiTags('Channels')
@Controller('channels')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class ChannelsController {
  constructor(private readonly channelService: ChannelsService) {}

  @Post()
  @Scopes(Scope.ChannelCreate)
  @ApiOperation({
    summary: 'Create a new channel',
    description: 'Required user scopes: [' + [Scope.ChannelCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Channel created successfully', type: Channel })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return await this.channelService.create(createChannelDto);
  }

  @Get()
  @Scopes(Scope.ChannelRead)
  @ApiOperation({
    summary: 'Get all channels',
    description: 'Required user scopes: [' + [Scope.ChannelRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateChannel })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Channel>> {
    return await this.channelService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.ChannelRead)
  @ApiOperation({
    summary: 'Get a channel by ID',
    description: 'Required user scopes: [' + [Scope.ChannelRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Channel })
  @ApiNotFoundResponse({ description: 'Channel not found' })
  @ApiBadRequestResponse({ description: 'Invalid channel ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Channel> {
    return await this.channelService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.ChannelUpdate)
  @ApiOperation({
    summary: 'Update a channel by ID',
    description: 'Required user scopes: [' + [Scope.ChannelUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Channel updated successfully', type: Channel })
  @ApiNotFoundResponse({ description: 'Channel not found' })
  @ApiBadRequestResponse({ description: 'Invalid channel ID' })
  async updateOneById(
    @Param('id') id: Types.ObjectId,
    @Body() updateChannelDto: UpdateChannelDto
  ): Promise<Channel> {
    return await this.channelService.updateOneById(id, updateChannelDto);
  }

  @Delete(':id')
  @Scopes(Scope.ChannelDelete)
  @ApiOperation({
    summary: 'Delete a channel by ID',
    description: 'Required user scopes: [' + [Scope.ChannelDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Channel deleted successfully', type: Channel })
  @ApiNotFoundResponse({ description: 'Channel not found' })
  @ApiBadRequestResponse({ description: 'Invalid channel ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Channel> {
    return await this.channelService.removeOneById(id);
  }
}
