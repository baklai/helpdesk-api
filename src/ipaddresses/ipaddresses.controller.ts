import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
  BadRequestException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { PaginateResult, Types } from 'mongoose';
import { isIP } from 'net';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { Ipaddress, PaginateIpaddress } from './schemas/ipaddress.schema';
import { IpaddressesService } from './ipaddresses.service';
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
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.IpaddressCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createIpaddressDto: CreateIpaddressDto): Promise<Ipaddress> {
    return await this.ipaddressService.create(createIpaddressDto);
  }

  @Get()
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateIpaddress })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(@Query() paginateQueryDto: PaginateQueryDto): Promise<PaginateResult<Ipaddress>> {
    return await this.ipaddressService.findAll(paginateQueryDto);
  }

  @Get('find')
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get record by field',
    description: 'Required scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiQuery({ name: 'ipaddress', description: 'The value of the field', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'The aggregate records', type: Boolean })
  async findOneByIP(
    @Query('ipaddress') ipaddress: string,
    @Query('populate') populate: boolean,
    @Query('aggregate') aggregate: boolean
  ): Promise<Ipaddress> {
    return await this.ipaddressService.findOneByIP(ipaddress, populate, aggregate);
  }

  @Get(':id')
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'The aggregate records', type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean,
    @Query('aggregate') aggregate: boolean
  ): Promise<Ipaddress> {
    return await this.ipaddressService.findOneById(id, populate, aggregate);
  }

  @Put(':id')
  @Scopes(Scope.IpaddressUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.IpaddressUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateIpaddressDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateIpaddressDto: UpdateIpaddressDto
  ): Promise<Ipaddress> {
    return await this.ipaddressService.updateOneById(id, updateIpaddressDto);
  }

  @Delete(':id')
  @Scopes(Scope.IpaddressDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.IpaddressDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Ipaddress> {
    return await this.ipaddressService.removeOneById(id);
  }
}
