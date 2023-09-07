import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/scopes.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { NoticesService } from './notices.service';
import { Notice } from './schemas/notice.schema';
import { NoticeDto } from './dto/notice.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';

@ApiTags('Notices')
@Controller('notices')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @Roles(Scope.NoticeCreate)
  @ApiOperation({ summary: 'Create a new notice' })
  @ApiCreatedResponse({ description: 'Notice created successfully', type: NoticeDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return await this.noticesService.create(createNoticeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notices for user' })
  @ApiOkResponse({ description: 'Success', type: [NoticeDto] })
  async findAll(@Request() req: Record<string, any>): Promise<Notice[]> {
    return await this.noticesService.findAll(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notice by ID for user' })
  @ApiOkResponse({ description: 'Notice deleted successfully', type: NoticeDto })
  @ApiNotFoundResponse({ description: 'Notice not found' })
  @ApiBadRequestResponse({ description: 'Invalid notice ID' })
  async removeOneById(
    @Param('id') id: string,
    @Request() req: Record<string, any>
  ): Promise<Notice> {
    return await this.noticesService.removeOneById(id, req.user.id);
  }
}
