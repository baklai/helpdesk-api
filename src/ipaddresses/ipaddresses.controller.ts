import { Get, Put, Post, Body, Param, Query, Delete, UseGuards, Controller } from '@nestjs/common';
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
import { PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { Ipaddress, PaginateIpaddress } from './schemas/ipaddress.schema';
import { IpaddressesService } from './ipaddresses.service';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';

@ApiTags('IP-адреси')
@Controller('ipaddresses')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class IpaddressesController {
  constructor(private readonly ipaddressService: IpaddressesService) {}

  @Post()
  @Scopes(Scope.IpaddressCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.IpaddressCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async create(@Body() createIpaddressDto: CreateIpaddressDto): Promise<Ipaddress> {
    return await this.ipaddressService.create(createIpaddressDto);
  }

  @Get()
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: PaginateIpaddress })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Ipaddress>> {
    return await this.ipaddressService.findAll(query);
  }

  @Get('find')
  @Scopes(Scope.IpaddressRead)
  @ApiOperation({
    summary: 'Отримати запис за полем',
    description: 'Необхідні дозволи: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiQuery({ name: 'ipaddress', description: 'Значення поля', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'Сукупні записи', type: Boolean })
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
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.IpaddressRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  @ApiQuery({ name: 'aggregate', description: 'Сукупні записи', type: Boolean })
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
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.IpaddressUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateIpaddressDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateIpaddressDto: UpdateIpaddressDto
  ): Promise<Ipaddress> {
    return await this.ipaddressService.updateOneById(id, updateIpaddressDto);
  }

  @Delete(':id')
  @Scopes(Scope.IpaddressDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.IpaddressDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Ipaddress })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Ipaddress> {
    return await this.ipaddressService.removeOneById(id);
  }
}
