import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types, PaginateModel, PaginateResult, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Request } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Inspector } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name) private readonly requestModel: PaginateModel<Request>,
    @InjectModel(Inspector.name) private readonly inspectorModel: Model<Inspector>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestModel.create(createRequestDto);
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Request>> {
    const { offset = 0, limit = 5, sort = { createdAt: -1 }, filters = {} } = query;

    if (filters?.status) {
      switch (filters?.status) {
        case 'true':
          filters['workerClose'] = { $ne: null };
          break;
        case 'false':
          filters['workerClose'] = null;
          break;
        default:
          break;
      }
      delete filters.status;
    }

    return await this.requestModel.paginate(
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

  async findOneById(
    id: string,
    populate: boolean = false,
    aggregate: boolean = false
  ): Promise<Request | any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const request = await this.requestModel
      .findById(id, null, {
        autopopulate: populate
      })
      .exec();
    if (!request) {
      throw new NotFoundException('Запис не знайдено');
    }
    if (!aggregate) return request;
    const ipaddress = await this.ipaddressModel
      .findOne({ ipaddress: request.ipaddress }, null, {
        autopopulate: populate
      })
      .exec();
    const inspector = await this.inspectorModel
      .findOne({ host: request.ipaddress }, null, {
        autopopulate: populate
      })
      .exec();
    return { request, ipaddress, inspector };
  }

  async updateOneById(id: string, updateRequestDto: UpdateRequestDto): Promise<Request> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const updatedRequest = await this.requestModel
      .findByIdAndUpdate(id, { $set: updateRequestDto }, { new: true })
      .exec();
    if (!updatedRequest) {
      throw new NotFoundException('Запис не знайдено');
    }
    return updatedRequest;
  }

  async removeOneById(id: string): Promise<Request> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const deletedRequest = await this.requestModel.findByIdAndRemove(id).exec();
    if (!deletedRequest) {
      throw new NotFoundException('Запис не знайдено');
    }
    return deletedRequest;
  }
}
