import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, PaginateModel, PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

import { Channel } from './schemas/channel.schema';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(@InjectModel(Channel.name) private readonly channelModel: PaginateModel<Channel>) {}

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    return await this.channelModel.create(createChannelDto);
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Channel>> {
    const { offset = 0, limit = 5, sort = { locationFrom: 1 }, filters = {} } = query;

    return await this.channelModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit: Number(limit) > 0 ? Number(limit) : await this.channelModel.countDocuments(),
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findOneById(id: Types.ObjectId): Promise<Channel> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid channel ID');
    }
    const channel = await this.channelModel.findById(id).exec();
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    return channel;
  }

  async updateOneById(id: Types.ObjectId, updateChannelDto: UpdateChannelDto): Promise<Channel> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid channel ID');
    }
    const updatedChannel = await this.channelModel
      .findByIdAndUpdate(id, { $set: updateChannelDto }, { new: true })
      .exec();
    if (!updatedChannel) {
      throw new NotFoundException('Channel not found');
    }
    return updatedChannel;
  }

  async removeOneById(id: Types.ObjectId): Promise<Channel> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid channel ID');
    }
    const deletedChannel = await this.channelModel.findByIdAndRemove(id).exec();
    if (!deletedChannel) {
      throw new NotFoundException('Channel not found');
    }
    return deletedChannel;
  }
}
