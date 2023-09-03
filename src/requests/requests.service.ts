import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, PaginateModel, PaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

import { Request } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request.name) private readonly requestModel: PaginateModel<Request>) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestModel.create(createRequestDto);
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Request>> {
    const { offset = 0, limit = 5, sort = { createdAt: -1 }, filters = {} } = query;

    return await this.requestModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit: Number(limit) > 0 ? Number(limit) : await this.requestModel.countDocuments(),
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findOneById(id: string, populate: boolean): Promise<Request> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid request ID');
    }
    const request = await this.requestModel
      .findById(id, null, {
        autopopulate: populate
      })
      .exec();
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    return request;
  }

  async updateOneById(id: string, updateRequestDto: UpdateRequestDto): Promise<Request> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid request ID');
    }

    const updatedRequest = await this.requestModel
      .findByIdAndUpdate(id, { $set: updateRequestDto }, { new: true })
      .exec();
    if (!updatedRequest) {
      throw new NotFoundException('Request not found');
    }
    return updatedRequest;
  }

  async removeOneById(id: string): Promise<Request> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid request ID');
    }
    const deletedRequest = await this.requestModel.findByIdAndRemove(id).exec();
    if (!deletedRequest) {
      throw new NotFoundException('Request not found');
    }
    return deletedRequest;
  }
}
