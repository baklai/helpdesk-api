import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginateModel } from 'mongoose';

import { NoticeStatusType } from 'src/common/enums/status.enum';
import { BaseCrudService } from 'src/common/services/base.service';
import { NoticesService } from 'src/notices/notices.service';

import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { ChannelEntity } from './entities/channel.entity';
import { Channel, ChannelDocument } from './models/channel.schema';

@Injectable()
export class ChannelsService extends BaseCrudService<
  ChannelDocument,
  ChannelEntity,
  CreateChannelInput,
  UpdateChannelInput
> {
  constructor(
    @InjectModel(Channel.name) private readonly channelModel: PaginateModel<ChannelDocument>,
    private readonly noticesService: NoticesService
  ) {
    super(channelModel);
  }

  private async sendNotice(doc: ChannelEntity, title: string, status: NoticeStatusType) {
    const message = [
      doc.locationFrom && `Місцезнаходження з: ${doc.locationFrom}`,
      doc.deviceFrom && `Пристрій від: ${doc.deviceFrom}`,
      doc.locationTo && `Місцезнаходження до: ${doc.locationTo}`,
      doc.deviceTo && `Пристрій до: ${doc.deviceTo}`
    ]
      .filter(Boolean)
      .join('\n');

    await this.noticesService.createOneByUser('channel', status, title, message);
  }

  override async create(input: CreateChannelInput): Promise<ChannelEntity> {
    const result = await super.create(input);
    void this.sendNotice(result, 'Створення каналу', NoticeStatusType.SUCCESS);
    return result;
  }

  override async updateOneById(id: string, input: UpdateChannelInput): Promise<ChannelEntity> {
    const result = await super.updateOneById(id, input);
    void this.sendNotice(result, 'Оновлення каналу', NoticeStatusType.INFO);
    return result;
  }

  override async removeOneById(id: string): Promise<ChannelEntity> {
    const result = await super.removeOneById(id);
    void this.sendNotice(result, 'Видалення каналу', NoticeStatusType.WARN);
    return result;
  }
}
