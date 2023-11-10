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
  Ip,
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
import { AggregatePaginateResult, Types } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { InspectorsService } from './inspectors.service';
import { Inspector, PaginateInspector } from './schemas/inspector.schema';
import { isIP } from 'class-validator';

@ApiTags('PC SysInspectors')
@Controller('inspectors')
export class InspectorsController {
  constructor(private readonly inspectorService: InspectorsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a new inspector' })
  @ApiCreatedResponse({ description: 'Inspector created successfully', type: Inspector })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(
    @Ip() ip: string,
    @Query() query: Record<string, any>,
    @Body() createInspectorDto: Record<string, any>
  ) {
    return await this.inspectorService.create(ip, query.field, createInspectorDto);
  }

  @Get()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Get all inspectors',
    description: 'Required user scopes: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Inspector created successfully', type: Inspector })
  @ApiOkResponse({ description: 'Success', type: PaginateInspector })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Inspector>> {
    return await this.inspectorService.findAll(query);
  }

  @Get('ipaddress')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Get a inspector by ID',
    description: 'Required user scopes: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Inspector })
  @ApiNotFoundResponse({ description: 'Inspector not found' })
  @ApiBadRequestResponse({ description: 'Invalid inspector ID' })
  async findOneByIP(@Param('ipaddress') ipaddress: string): Promise<Inspector> {
    if (!isIP(ipaddress)) {
      throw new BadRequestException('Invalid IP Address');
    }
    return await this.inspectorService.findOneByIP(ipaddress);
  }

  @Get(':id')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorRead)
  @ApiOperation({
    summary: 'Get a inspector by ID',
    description: 'Required user scopes: [' + [Scope.InspectorRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Inspector })
  @ApiNotFoundResponse({ description: 'Inspector not found' })
  @ApiBadRequestResponse({ description: 'Invalid inspector ID' })
  async findOneById(@Param('id') id: string): Promise<Inspector> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid inspector ID');
    }
    return await this.inspectorService.findOneById(id);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @Scopes(Scope.InspectorDelete)
  @ApiOperation({
    summary: 'Delete a inspector by ID',
    description: 'Required user scopes: [' + [Scope.InspectorDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Inspector deleted successfully', type: Inspector })
  @ApiNotFoundResponse({ description: 'Inspector not found' })
  @ApiBadRequestResponse({ description: 'Invalid inspector ID' })
  async removeOneById(@Param('id') id: string): Promise<Inspector> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid inspector ID');
    }
    return await this.inspectorService.removeOneById(id);
  }
}
