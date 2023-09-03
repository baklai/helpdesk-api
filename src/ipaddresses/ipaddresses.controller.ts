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

import { IpaddressesService } from './ipaddresses.service';
import { Ipaddress } from './schemas/ipaddress.schema';
import { IpaddressDto } from './dto/ipaddress.dto';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';
import { PaginateIpaddressDto } from './dto/paginate-ipaddress.dto';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('IPAddresses')
@Controller('ipaddresses')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class IpaddressesController {
  constructor(private readonly ipaddressService: IpaddressesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ipaddress' })
  @ApiCreatedResponse({ description: 'Ipaddress created successfully', type: IpaddressDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createChannelDto: CreateIpaddressDto): Promise<Ipaddress> {
    return await this.ipaddressService.create(createChannelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ipaddresses' })
  @ApiOkResponse({ description: 'Success', type: PaginateIpaddressDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Ipaddress>> {
    return await this.ipaddressService.findAll(query);
  }

  @Get(':search')
  @ApiOperation({ summary: 'Get a ipaddress by ID' })
  @ApiOkResponse({ description: 'Success', type: IpaddressDto })
  @ApiNotFoundResponse({ description: 'Ipaddress not found' })
  @ApiBadRequestResponse({ description: 'Invalid ipaddress ID' })
  async findOneById(@Param('search') search: string, @Query('populate') populate: boolean): Promise<Ipaddress> {
    if (isIP(search)) {
      return await this.ipaddressService.findOneByIP(search, populate);
    } else {
      return await this.ipaddressService.findOneById(search, populate);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ipaddress by ID' })
  @ApiOkResponse({ description: 'Ipaddress updated successfully', type: IpaddressDto })
  @ApiNotFoundResponse({ description: 'Ipaddress not found' })
  @ApiBadRequestResponse({ description: 'Invalid ipaddress ID' })
  async updateOneById(@Param('id') id: string, @Body() updateChannelDto: UpdateIpaddressDto): Promise<Ipaddress> {
    return await this.ipaddressService.updateOneById(id, updateChannelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ipaddress by ID' })
  @ApiOkResponse({ description: 'Ipaddress deleted successfully', type: IpaddressDto })
  @ApiNotFoundResponse({ description: 'Ipaddress not found' })
  @ApiBadRequestResponse({ description: 'Invalid ipaddress ID' })
  async removeOneById(@Param('id') id: string): Promise<Ipaddress> {
    return await this.ipaddressService.removeOneById(id);
  }
}
