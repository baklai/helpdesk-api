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

@ApiTags('ONMAP Сканер')
@Controller('onmaps')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class OnmapsController {
  constructor(private readonly onmapService: OnmapsService) {}

  @Post()
  @Scopes(Scope.OnmapCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.OnmapCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Onmap })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateOnmapDto })
  async create(@Body() createOnmapDto: CreateOnmapDto) {
    return await this.onmapService.create(createOnmapDto);
  }

  @Get()
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: PaginateOnmap })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: PaginateQueryDto): Promise<AggregatePaginateResult<Onmap>> {
    return await this.onmapService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.OnmapRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.OnmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Onmap })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async findOneById(@Param('id') id: string): Promise<Onmap> {
    return await this.onmapService.findOneById(id);
  }

  @Delete(':id')
  @Scopes(Scope.OnmapDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.OnmapDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Onmap })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Onmap> {
    return await this.onmapService.removeOneById(id);
  }
}
