import { Get, Post, Body, Param, Query, Delete, UseGuards, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { OnmapsService } from './onmaps.service';
import { Onmap, PaginateOnmap } from './schemas/onmap.schema';
import { CreateOnmapDto } from './dto/create-onmap.dto';

@ApiTags('Online nmap')
@Controller('onmaps')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class OnmapsController {
  constructor(private readonly onmapService: OnmapsService) {}

  @Post()
  @Scopes(Scope.OnmapCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.OnmapCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Onmap })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreateOnmapDto })
  async create(@Body() createOnmapDto: CreateOnmapDto) {
    return await this.onmapService.create(createOnmapDto);
  }

  @Get()
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateOnmap })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Onmap>> {
    return await this.onmapService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Onmap })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Onmap> {
    return await this.onmapService.findOneById(id);
  }

  @Delete(':id')
  @Scopes(Scope.OnmapDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.OnmapDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Onmap })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Onmap> {
    return await this.onmapService.removeOneById(id);
  }
}
