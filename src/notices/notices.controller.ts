import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { NoticesService } from './notices.service';
import { Notice } from './schemas/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';

@ApiTags('Notices')
@Controller('notices')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @Scopes(Scope.NoticeCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.NoticeCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: [Notice] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreateNoticeDto })
  async create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice[]> {
    return await this.noticesService.create(createNoticeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records by ID', description: 'Required scopes: []' })
  @ApiOkResponse({ description: 'Success', type: [Notice] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Request() req: Record<string, any>): Promise<Notice[]> {
    return await this.noticesService.findAll(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: []'
  })
  @ApiOkResponse({ description: 'Success', type: Notice })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(
    @Param('id') id: string,
    @Request() req: Record<string, any>
  ): Promise<Notice> {
    return await this.noticesService.removeOneById(id, req.user.id);
  }
}
