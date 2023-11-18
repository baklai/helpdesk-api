import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginateModel, PaginateResult, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Mailbox } from './schemas/mailbox.schema';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { CreateMailboxDto } from './dto/create-mailbox.dto';
import { UpdateMailboxDto } from './dto/update-mailbox.dto';

@Injectable()
export class MailboxesService {
  constructor(@InjectModel(Mailbox.name) private readonly mailboxModel: PaginateModel<Mailbox>) {}

  async create(createMailboxDto: CreateMailboxDto): Promise<Mailbox> {
    return await this.mailboxModel.create(createMailboxDto);
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
      throw new BadRequestException('Invalid mailbox ID');
    }
    const mailbox = await this.mailboxModel
      .findById(id, null, {
        autopopulate: populate
      })
      .exec();
    if (!mailbox) {
      throw new NotFoundException('Mailbox not found');
    }
    return mailbox;
  }

  async updateOneById(id: string, updateMailboxDto: UpdateMailboxDto): Promise<Mailbox> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid mailbox ID');
    }
    const updatedMailbox = await this.mailboxModel
      .findByIdAndUpdate(id, { $set: updateMailboxDto }, { new: true })
      .exec();
    if (!updatedMailbox) {
      throw new NotFoundException('Channel not found');
    }
    return updatedMailbox;
  }

  async removeOneById(id: string): Promise<Mailbox> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid mailbox ID');
    }
    const deletedMailbox = await this.mailboxModel.findByIdAndRemove(id).exec();
    if (!deletedMailbox) {
      throw new NotFoundException('Mailbox not found');
    }
    return deletedMailbox;
  }
}
