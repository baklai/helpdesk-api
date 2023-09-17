import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put
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

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';

import { MailboxesService } from './mailboxes.service';
import { CreateMailboxDto } from './dto/create-mailbox.dto';
import { UpdateMailboxDto } from './dto/update-mailbox.dto';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { MailboxDto } from './dto/mailbox.dto';
import { Mailbox } from './schemas/mailbox.schema';
import { PaginateResult } from 'mongoose';
import { PaginateMailboxDto } from './dto/paginate-mailbox.dto';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

@ApiTags('Mailboxes')
@Controller('mailboxes')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class MailboxesController {
  constructor(private readonly mailboxesService: MailboxesService) {}

  @Post()
  @Scopes(Scope.MailboxCreate)
  @ApiOperation({
    summary: 'Create a new ipaddress',
    description: 'Required user scopes: [' + [Scope.MailboxCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Mailbox created successfully', type: MailboxDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createMailboxDto: CreateMailboxDto): Promise<Mailbox> {
    return await this.mailboxesService.create(createMailboxDto);
  }

  @Get()
  @Scopes(Scope.MailboxRead)
  @ApiOperation({
    summary: 'Get all mailboxes',
    description: 'Required user scopes: [' + [Scope.MailboxRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: PaginateMailboxDto })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Mailbox>> {
    return await this.mailboxesService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.MailboxRead)
  @ApiOperation({
    summary: 'Get a mailbox by ID',
    description: 'Required user scopes: [' + [Scope.MailboxRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: MailboxDto })
  @ApiNotFoundResponse({ description: 'Mailbox not found' })
  @ApiBadRequestResponse({ description: 'Invalid mailbox ID' })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean
  ): Promise<Mailbox> {
    return await this.mailboxesService.findOneById(id, populate);
  }

  @Put(':id')
  @Scopes(Scope.MailboxUpdate)
  @ApiOperation({
    summary: 'Update a mailbox by ID',
    description: 'Required user scopes: [' + [Scope.MailboxUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Mailbox updated successfully', type: MailboxDto })
  @ApiNotFoundResponse({ description: 'Mailbox not found' })
  @ApiBadRequestResponse({ description: 'Invalid mailbox ID' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateMailboxDto: UpdateMailboxDto
  ): Promise<Mailbox> {
    return await this.mailboxesService.updateOneById(id, updateMailboxDto);
  }

  @Delete(':id')
  @Scopes(Scope.MailboxDelete)
  @ApiOperation({
    summary: 'Delete a mailbox by ID',
    description: 'Required user scopes: [' + [Scope.MailboxDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Mailbox deleted successfully', type: MailboxDto })
  @ApiNotFoundResponse({ description: 'Mailbox not found' })
  @ApiBadRequestResponse({ description: 'Invalid mailbox ID' })
  async removeOneById(@Param('id') id: string): Promise<Mailbox> {
    return await this.mailboxesService.removeOneById(id);
  }
}
