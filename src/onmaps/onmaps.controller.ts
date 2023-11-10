import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Ip
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
import { AggregatePaginateResult, Types } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { OnmapsService } from './onmaps.service';
import { Onmap, PaginateOnmap } from './schemas/onmap.schema';

@ApiTags('ONMAP Scanner')
@Controller('onmaps')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class OnmapsController {
  constructor(private readonly onmapService: OnmapsService) {}

  @Post()
  @Scopes(Scope.OnmapCreate)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a new inspector' })
  @ApiCreatedResponse({ description: 'Onmap created successfully', type: Onmap })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createOnmapDto: Record<string, any>) {
    return await this.onmapService.create(createOnmapDto);
  }

  @Get()
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Get all inspectors',
    description: 'Required user scopes: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Onmap successfully', type: Onmap })
  @ApiOkResponse({ description: 'Success', type: PaginateOnmap })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Onmap>> {
    return await this.onmapService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Get a inspector by ID',
    description: 'Required user scopes: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Onmap })
  @ApiNotFoundResponse({ description: 'Onmap not found' })
  @ApiBadRequestResponse({ description: 'Invalid report ID' })
  async findOneById(@Param('id') id: Types.ObjectId): Promise<Onmap> {
    return await this.onmapService.findOneById(id);
  }

  @Delete(':id')
  @Scopes(Scope.OnmapDelete)
  @ApiOperation({
    summary: 'Delete a inspector by ID',
    description: 'Required user scopes: [' + [Scope.OnmapDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Onmap deleted successfully', type: Onmap })
  @ApiNotFoundResponse({ description: 'Onmap not found' })
  @ApiBadRequestResponse({ description: 'Invalid report ID' })
  async removeOneById(@Param('id') id: Types.ObjectId): Promise<Onmap> {
    return await this.onmapService.removeOneById(id);
  }
}
