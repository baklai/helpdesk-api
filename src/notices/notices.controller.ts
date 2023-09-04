import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

import { NoticesService } from './notices.service';
import { Notice } from './schemas/notice.schema';
import { NoticeDto } from './dto/notice.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('Notices')
@Controller('notices')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @Roles(Role.NoticeCreate)
  @ApiOperation({ summary: 'Create a new notice' })
  @ApiCreatedResponse({ description: 'Notice created successfully', type: NoticeDto })
  @ApiConflictResponse({ description: 'A notice with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return await this.noticesService.create(createNoticeDto);
  }

  @Get()
  @Roles(Role.NoticeRead)
  @ApiOperation({ summary: 'Get all notices' })
  @ApiOkResponse({ description: 'Success', type: [NoticeDto] })
  async findAll(): Promise<Notice[]> {
    return await this.noticesService.findAll();
  }

  @Get(':id')
  @Roles(Role.NoticeRead)
  @ApiOperation({ summary: 'Get a notice by ID' })
  @ApiOkResponse({ description: 'Success', type: NoticeDto })
  @ApiNotFoundResponse({ description: 'Notice not found' })
  @ApiBadRequestResponse({ description: 'Invalid notice ID' })
  async findOneById(@Param('id') id: string): Promise<Notice> {
    return await this.noticesService.findOneById(id);
  }

  @Put(':id')
  @Roles(Role.NoticeUpdate)
  @ApiOperation({ summary: 'Update a notice by ID' })
  @ApiOkResponse({ description: 'Notice updated successfully', type: NoticeDto })
  @ApiNotFoundResponse({ description: 'Notice not found' })
  @ApiConflictResponse({ description: 'A notice with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Invalid notice ID' })
  async updateOneById(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    return await this.noticesService.updateOneById(id, updateNoticeDto);
  }

  @Delete(':id')
  @Roles(Role.NoticeDelete)
  @ApiOperation({ summary: 'Delete a notice by ID' })
  @ApiOkResponse({ description: 'Notice deleted successfully', type: NoticeDto })
  @ApiNotFoundResponse({ description: 'Notice not found' })
  @ApiBadRequestResponse({ description: 'Invalid notice ID' })
  async removeOneById(@Param('id') id: string): Promise<Notice> {
    return await this.noticesService.removeOneById(id);
  }
}
