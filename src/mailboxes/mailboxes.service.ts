import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMailboxDto } from './dto/create-mailbox.dto';
import { UpdateMailboxDto } from './dto/update-mailbox.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mailbox } from './schemas/mailbox.schema';
import { PaginateModel, PaginateResult, Types } from 'mongoose';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

@Injectable()
export class MailboxesService {
  constructor(@InjectModel(Mailbox.name) private readonly mailboxModel: PaginateModel<Mailbox>) {}

  async create(createMailboxDto: CreateMailboxDto): Promise<Mailbox> {
    return await this.mailboxModel.create(createMailboxDto);
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Mailbox>> {
    const { offset = 0, limit = 5, sort = { locationFrom: 1 }, filters = {} } = query;

    return await this.mailboxModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit: Number(limit) > 0 ? Number(limit) : await this.mailboxModel.countDocuments(),
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findOneById(id: string): Promise<Mailbox> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid mailbox ID');
    }
    const mailbox = await this.mailboxModel.findById(id).exec();
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
