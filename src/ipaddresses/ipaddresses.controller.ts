import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
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
import { isIP } from 'net';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { IpaddressesService } from './ipaddresses.service';
import { Ipaddress, PaginateIpaddress } from './schemas/ipaddress.schema';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';

@ApiTags('IP Addresses')
@Controller('ipaddresses')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class IpaddressesController {
  constructor(private readonly ipaddressService: IpaddressesService) {}

  @Post()
  @Scopes(Scope.IpaddressCreate)
  @ApiOperation({
    summary: 'Create a new IP Address',
    description: 'Required user scopes: [' + [Scope.IpaddressCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'IP Address created successfully', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createIpaddressDto: CreateIpaddressDto): Promise<Ipaddress> {
    return await this.ipaddressService.create(createIpaddressDto);
  }

  @Get()
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get all IP Addresses',
    description: 'Required user scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({ description: 'Success', type: PaginateIpaddress })
  async findAll(@Query() paginateQueryDto: PaginateQueryDto): Promise<PaginateResult<Ipaddress>> {
    return await this.ipaddressService.findAll(paginateQueryDto);
  }

  @Get('ipaddress')
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get a IP Address by IP Address',
    description: 'Required user scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ipaddress })
  @ApiNotFoundResponse({ description: 'IP Address not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOneByIP(
    @Query('ipaddress') ipaddress: string,
    @Query('populate') populate: boolean
  ): Promise<Ipaddress> {
    if (!isIP(ipaddress)) {
      throw new BadRequestException('Invalid IP Address');
    }
    return await this.ipaddressService.findOneByIP(ipaddress, populate);
  }

  @Get(':id')
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get a IP Address by ID',
    description: 'Required user scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ipaddress })
  @ApiNotFoundResponse({ description: 'IP Address not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean
  ): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return await this.ipaddressService.findOneById(id, populate);
  }

  @Put(':id')
  @Scopes(Scope.IpaddressUpdate)
  @ApiOperation({
    summary: 'Update a IP Address by ID',
    description: 'Required user scopes: [' + [Scope.IpaddressUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'IP Address updated successfully', type: Ipaddress })
  @ApiNotFoundResponse({ description: 'IP Address not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateIpaddressDto
  ): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return await this.ipaddressService.updateOneById(id, updateChannelDto);
  }

  @Delete(':id')
  @Scopes(Scope.IpaddressDelete)
  @ApiOperation({
    summary: 'Delete a IP Address by ID',
    description: 'Required user scopes: [' + [Scope.IpaddressDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'IP Address deleted successfully', type: Ipaddress })
  @ApiNotFoundResponse({ description: 'IP Address not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async removeOneById(@Param('id') id: string): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return await this.ipaddressService.removeOneById(id);
  }
}
