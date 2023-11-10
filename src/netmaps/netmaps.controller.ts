import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NetmapsService } from './netmaps.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { Types } from 'mongoose';

@ApiTags('Network maps')
@Controller('netmaps')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class NetmapsController {
  constructor(private readonly netmapsService: NetmapsService) {}

  @Get(':id')
  @Scopes(Scope.NetmapRead)
  @ApiOperation({
    summary: 'Get a location by ID',
    description: 'Required user scopes: [' + [Scope.NetmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid location ID' })
  async networkMap(@Param('id') id: Types.ObjectId) {
    return this.netmapsService.networkMap(id);
  }
}
