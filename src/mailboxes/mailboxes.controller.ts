import { Controller, UseGuards, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { MailboxesService } from './mailboxes.service';
import { CreateMailboxDto } from './dto/create-mailbox.dto';
import { UpdateMailboxDto } from './dto/update-mailbox.dto';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { Mailbox, PaginateMailbox } from './schemas/mailbox.schema';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

@ApiTags('Mail boxes')
@Controller('mailboxes')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class MailboxesController {
  constructor(private readonly mailboxesService: MailboxesService) {}

  @Post()
  @Scopes(Scope.MailboxCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.MailboxCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ description: 'Request body object', type: CreateMailboxDto })
  async create(@Body() createMailboxDto: CreateMailboxDto): Promise<Mailbox> {
    return await this.mailboxesService.create(createMailboxDto);
  }

  @Get()
  @Scopes(Scope.MailboxRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.MailboxRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateMailbox })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Mailbox>> {
    return await this.mailboxesService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.MailboxRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.MailboxRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiQuery({ name: 'populate', description: 'The populate records', type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean
  ): Promise<Mailbox> {
    return await this.mailboxesService.findOneById(id, populate);
  }

  @Put(':id')
  @Scopes(Scope.MailboxUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.MailboxUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateMailboxDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateMailboxDto: UpdateMailboxDto
  ): Promise<Mailbox> {
    return await this.mailboxesService.updateOneById(id, updateMailboxDto);
  }

  @Delete(':id')
  @Scopes(Scope.MailboxDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.MailboxDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Mailbox> {
    return await this.mailboxesService.removeOneById(id);
  }
}
