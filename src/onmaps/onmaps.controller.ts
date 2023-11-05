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
import { AggregatePaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { isIP } from 'class-validator';
import { OnmapsService } from './onmaps.service';
import { OnmapDto } from './dto/onmap.dto';
import { Onmap } from './schemas/onmap.schema';
import { PaginateOnmapDto } from './dto/paginate-onmap.dto';

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
  @ApiCreatedResponse({ description: 'Onmap created successfully', type: OnmapDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(
    @Ip() ip: string,
    @Query() query: Record<string, any>,
    @Body() createOnmapDto: Record<string, any>
  ) {
    return await this.onmapService.create(ip, query.field, createOnmapDto);
  }

  @Get()
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Get all inspectors',
    description: 'Required user scopes: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Onmap created successfully', type: OnmapDto })
  @ApiOkResponse({ description: 'Success', type: PaginateOnmapDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Onmap>> {
    return await this.onmapService.findAll(query);
  }

  @Get(':search')
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Get a inspector by ID',
    description: 'Required user scopes: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: OnmapDto })
  @ApiNotFoundResponse({ description: 'Onmap not found' })
  @ApiBadRequestResponse({ description: 'Invalid inspector ID' })
  async findOneById(@Param('search') search: string): Promise<Onmap> {
    if (isIP(search)) {
      return await this.onmapService.findOneByIP(search);
    } else {
      return await this.onmapService.findOneById(search);
    }
  }

  @Delete(':id')
  @Scopes(Scope.OnmapDelete)
  @ApiOperation({
    summary: 'Delete a inspector by ID',
    description: 'Required user scopes: [' + [Scope.OnmapDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Onmap deleted successfully', type: OnmapDto })
  @ApiNotFoundResponse({ description: 'Onmap not found' })
  @ApiBadRequestResponse({ description: 'Invalid inspector ID' })
  async removeOneById(@Param('id') id: string): Promise<Onmap> {
    return await this.onmapService.removeOneById(id);
  }
}
