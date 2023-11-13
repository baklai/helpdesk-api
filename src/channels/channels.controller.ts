import { Get, Post, Body, Param, Delete, Put, Query, UseGuards, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
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
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.ChannelCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Channel })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreateChannelDto })
  async create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return await this.channelService.create(createChannelDto);
  }

  @Get()
  @Scopes(Scope.ChannelRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.ChannelRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateChannel })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Channel>> {
    return await this.channelService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.ChannelRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.ChannelRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Channel })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Channel> {
    return await this.channelService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.ChannelUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.ChannelUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Channel })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateChannelDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto
  ): Promise<Channel> {
    return await this.channelService.updateOneById(id, updateChannelDto);
  }

  @Delete(':id')
  @Scopes(Scope.ChannelDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.ChannelDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Channel })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Channel> {
    return await this.channelService.removeOneById(id);
  }
}
