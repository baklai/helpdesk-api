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

@ApiTags('Поштові скриньки')
@Controller('mailboxes')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class MailboxesController {
  constructor(private readonly mailboxesService: MailboxesService) {}

  @Post()
  @Scopes(Scope.MailboxCreate)
  @ApiOperation({
    summary: 'Створити новий запис',
    description: 'Необхідні дозволи: [' + [Scope.MailboxCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Успіх', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiBody({ description: "Об'єкт тіла запиту", type: CreateMailboxDto })
  async create(@Body() createMailboxDto: CreateMailboxDto): Promise<Mailbox> {
    return await this.mailboxesService.create(createMailboxDto);
  }

  @Get()
  @Scopes(Scope.MailboxRead)
  @ApiOperation({
    summary: 'Отримати всі записи',
    description: 'Необхідні дозволи: [' + [Scope.MailboxRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: PaginateMailbox })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  async findAll(@Query() query: PaginateQueryDto): Promise<PaginateResult<Mailbox>> {
    return await this.mailboxesService.findAll(query);
  }

  @Get(':id')
  @Scopes(Scope.MailboxRead)
  @ApiOperation({
    summary: 'Отримати запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.MailboxRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiQuery({ name: 'populate', description: "Отримати пов'язані записи", type: Boolean })
  async findOneById(
    @Param('id') id: string,
    @Query('populate') populate: boolean
  ): Promise<Mailbox> {
    return await this.mailboxesService.findOneById(id, populate);
  }

  @Put(':id')
  @Scopes(Scope.MailboxUpdate)
  @ApiOperation({
    summary: 'Оновити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.MailboxUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  @ApiBody({ description: "Об'єкт тіла запиту", type: UpdateMailboxDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateMailboxDto: UpdateMailboxDto
  ): Promise<Mailbox> {
    return await this.mailboxesService.updateOneById(id, updateMailboxDto);
  }

  @Delete(':id')
  @Scopes(Scope.MailboxDelete)
  @ApiOperation({
    summary: 'Видалити запис за ID',
    description: 'Необхідні дозволи: [' + [Scope.MailboxDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Успіх', type: Mailbox })
  @ApiBadRequestResponse({ description: 'Поганий запит' })
  @ApiNotFoundResponse({ description: 'Не знайдено' })
  @ApiParam({ name: 'id', description: 'ID Ідентифікатор запису', type: String })
  async removeOneById(@Param('id') id: string): Promise<Mailbox> {
    return await this.mailboxesService.removeOneById(id);
  }
}
