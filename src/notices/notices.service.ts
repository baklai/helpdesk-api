import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Notice } from './schemas/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticesService {
  constructor(@InjectModel(Notice.name) private readonly noticeModel: Model<Notice>) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    try {
      const createdNotice = await this.noticeModel.create(createNoticeDto);
      return createdNotice;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A notice with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Notice[]> {
    return await this.noticeModel.find().exec();
  }

  async findOneById(id: string): Promise<Notice> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid notice ID');
    }
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) {
      throw new NotFoundException('Notice not found');
    }
    return notice;
  }

  async updateOneById(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid notice ID');
    }
    try {
      const updatedNotice = await this.noticeModel
        .findByIdAndUpdate(id, { $set: updateNoticeDto }, { new: true })
        .exec();
      if (!updatedNotice) {
        throw new NotFoundException('Notice not found');
      }
      return updatedNotice;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A notice with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Notice> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid notice ID');
    }
    const deletedNotice = await this.noticeModel.findByIdAndRemove(id).exec();
    if (!deletedNotice) {
      throw new NotFoundException('Notice not found');
    }
    return deletedNotice;
  }
}
