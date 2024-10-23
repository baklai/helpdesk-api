import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginateModel, PaginateResult, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Scope } from 'src/common/enums/scope.enum';
import { MailerService } from 'src/mailer/mailer.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

import { Mailbox } from './schemas/mailbox.schema';
import { CreateMailboxDto } from './dto/create-mailbox.dto';
import { UpdateMailboxDto } from './dto/update-mailbox.dto';

@Injectable()
export class MailboxesService {
  constructor(
    @InjectModel(Mailbox.name) private readonly mailboxModel: PaginateModel<Mailbox>,
    private readonly mailerService: MailerService,
    private readonly profilesService: ProfilesService
  ) {}

  async create(createMailboxDto: CreateMailboxDto): Promise<Mailbox> {
    const mailbox = await this.mailboxModel.create(createMailboxDto);

    const emails = await this.profilesService.findEmailsIsNotice(Scope.MailboxNotice);

    this.mailerService.sendMailbox(emails, mailbox, 'Додавання електронної пошти');

    return mailbox;
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Mailbox>> {
    const { offset = 0, limit = 5, sort = { dateOpen: -1 }, filters = {} } = query;

    if (filters?.status) {
      switch (filters?.status) {
        case 'true':
          filters['dateOpen'] = { $ne: null };
          filters['dateClose'] = null;
          break;
        case 'false':
          filters['dateOpen'] = { $ne: null };
          filters['dateClose'] = { $ne: null };
          break;
        default:
          break;
      }
      delete filters.status;
    }

    return await this.mailboxModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit,
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findOneById(id: string, populate: boolean = false): Promise<Mailbox> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор поштової скриньки');
    }
    const mailbox = await this.mailboxModel
      .findById(id, null, {
        autopopulate: populate
      })
      .exec();
    if (!mailbox) {
      throw new NotFoundException('Поштова скринька не знайдена');
    }
    return mailbox;
  }

  async updateOneById(id: string, updateMailboxDto: UpdateMailboxDto): Promise<Mailbox> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор поштової скриньки');
    }
    const updatedMailbox = await this.mailboxModel
      .findByIdAndUpdate(id, { $set: updateMailboxDto }, { new: true })
      .exec();
    if (!updatedMailbox) {
      throw new NotFoundException('Канал не знайдено');
    }
    return updatedMailbox;
  }

  async removeOneById(id: string): Promise<Mailbox> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор поштової скриньки');
    }

    const mailbox = await this.mailboxModel.findById(id);

    const deletedMailbox = await this.mailboxModel.findByIdAndRemove(id).exec();

    if (!deletedMailbox) {
      throw new NotFoundException('Поштова скринька не знайдена');
    }

    const emails = await this.profilesService.findEmailsIsNotice(Scope.MailboxNotice);

    this.mailerService.sendMailbox(emails, mailbox, 'Видалення електронної пошти');

    return deletedMailbox;
  }
}
