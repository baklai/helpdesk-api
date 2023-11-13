import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NetmapsService } from './netmaps.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';

@ApiTags('Network maps')
@Controller('netmaps')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class NetmapsController {
  constructor(private readonly netmapsService: NetmapsService) {}

  @Get(':id')
  @Scopes(Scope.NetmapRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.NetmapRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Object })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async networkMap(@Param('id') id: string) {
    return this.netmapsService.networkMap(id);
  }
}
