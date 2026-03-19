import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginateModel, PaginateResult } from 'mongoose';

import { PaginateArgs } from 'src/common/dto/paginate.args';
import { NoticeStatusType } from 'src/common/enums/status.enum';
import { BaseCrudService } from 'src/common/services/base.service';
import { NoticesService } from 'src/notices/notices.service';

import { CreateMailboxInput } from './dto/create-mailbox.input';
import { UpdateMailboxInput } from './dto/update-mailbox.input';
import { MailboxEntity } from './entities/mailbox.entity';
import { Mailbox, MailboxDocument } from './models/mailbox.schema';

@Injectable()
export class MailboxesService extends BaseCrudService<
  MailboxDocument,
  MailboxEntity,
  CreateMailboxInput,
  UpdateMailboxInput
> {
  constructor(
    @InjectModel(Mailbox.name) private readonly mailboxModel: PaginateModel<MailboxDocument>,
    private readonly noticesService: NoticesService
  ) {
    super(mailboxModel);
  }

  private async sendNotice(doc: MailboxEntity, title: string, severity: NoticeStatusType) {
    const message = [
      `Email: ${doc.email}`,
      `ПІБ: ${doc.fullname}`,
      `Лист №: ${doc.reqnum}`,
      `Статус: ${doc.status}`
    ]
      .filter(Boolean)
      .join('\n');

    await this.noticesService.createOneByUser('mailbox', severity, title, message);
  }

  override async create(input: CreateMailboxInput): Promise<MailboxEntity> {
    const result = await super.create(input);
    void this.sendNotice(result, 'Створення поштової скриньки', NoticeStatusType.SUCCESS);
    return result;
  }

  override async findAllPaginated(args: PaginateArgs): Promise<PaginateResult<MailboxEntity>> {
    return super.findAllPaginated({
      ...args,
      sort: args.sort ?? { indexip: 1 },
      filters: args.filters
    });
  }

  async updateOneById(id: string, input: UpdateMailboxInput): Promise<MailboxEntity> {
    const result = await super.updateOneById(id, input);
    void this.sendNotice(result, 'Оновлення поштової скриньки', NoticeStatusType.INFO);
    return result;
  }

  async removeOneById(id: string): Promise<MailboxEntity> {
    const result = await super.removeOneById(id);
    void this.sendNotice(result, 'Видалення поштової скриньки', NoticeStatusType.WARN);
    return result;
  }
}
