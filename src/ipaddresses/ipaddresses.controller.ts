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
import { isIP } from 'net';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { IpaddressesService } from './ipaddresses.service';
import { Ipaddress } from './schemas/ipaddress.schema';
import { IpaddressDto } from './dto/ipaddress.dto';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';
import { PaginateIpaddressDto } from './dto/paginate-ipaddress.dto';

@ApiTags('IPAddresses')
@Controller('ipaddresses')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class IpaddressesController {
  constructor(private readonly ipaddressService: IpaddressesService) {}

  @Post()
  @Scopes(Scope.IpaddressCreate)
  @ApiOperation({
    summary: 'Create a new ipaddress',
    description: 'Required user scopes: [' + [Scope.IpaddressCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Ipaddress created successfully', type: IpaddressDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createChannelDto: CreateIpaddressDto): Promise<Ipaddress> {
    return await this.ipaddressService.create(createChannelDto);
  }

  @Get()
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get all ipaddresses',
    description: 'Required user scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateIpaddressDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Ipaddress>> {
    return await this.ipaddressService.findAll(query);
  }

  @Get(':search')
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get a ipaddress by ID',
    description: 'Required user scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: IpaddressDto })
  @ApiNotFoundResponse({ description: 'Ipaddress not found' })
  @ApiBadRequestResponse({ description: 'Invalid ipaddress ID' })
  async findOneById(
    @Param('search') search: string,
    @Query('populate') populate: boolean
  ): Promise<Ipaddress> {
    if (isIP(search)) {
      return await this.ipaddressService.findOneByIP(search, populate);
    } else {
      return await this.ipaddressService.findOneById(search, populate);
    }
  }

  @Put(':id')
  @Scopes(Scope.IpaddressUpdate)
  @ApiOperation({
    summary: 'Update a ipaddress by ID',
    description: 'Required user scopes: [' + [Scope.IpaddressUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Ipaddress updated successfully', type: IpaddressDto })
  @ApiNotFoundResponse({ description: 'Ipaddress not found' })
  @ApiBadRequestResponse({ description: 'Invalid ipaddress ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateIpaddressDto
  ): Promise<Ipaddress> {
    return await this.ipaddressService.updateOneById(id, updateChannelDto);
  }

  @Delete(':id')
  @Scopes(Scope.IpaddressDelete)
  @ApiOperation({
    summary: 'Delete a ipaddress by ID',
    description: 'Required user scopes: [' + [Scope.IpaddressDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Ipaddress deleted successfully', type: IpaddressDto })
  @ApiNotFoundResponse({ description: 'Ipaddress not found' })
  @ApiBadRequestResponse({ description: 'Invalid ipaddress ID' })
  async removeOneById(@Param('id') id: string): Promise<Ipaddress> {
    return await this.ipaddressService.removeOneById(id);
  }
}
