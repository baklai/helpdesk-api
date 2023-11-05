import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Onmap } from './schemas/onmap.schema';

@Injectable()
export class OnmapsService {
  constructor(
    @InjectModel(Onmap.name) private readonly onmapModel: AggregatePaginateModel<Onmap>
  ) {}

  async create(host: string, field: string, createInspectorDto: Record<string, any>) {
    await this.onmapModel
      .findOneAndUpdate(
        { host },
        {
          $set: {
            host,
            [field]:
              field === 'baseboard' || field === 'bios' || field === 'cpu' || field === 'os'
                ? createInspectorDto[createInspectorDto.length - 1]
                : createInspectorDto
          }
        },
        { new: true, upsert: true }
      )
      .exec();
    return;
  }

  async findAll(query: PaginateQueryDto): Promise<AggregatePaginateResult<Onmap>> {
    const { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} } = query;

    if (filters?.updatedAt?.$gte && filters?.updatedAt?.$lt) {
      filters.updatedAt.$gte = new Date(filters?.updatedAt.$gte);
      filters.updatedAt.$lt = new Date(filters?.updatedAt.$lt);
    }

    const aggregation = [
      {
        $match: filters
      },
      {
        $addFields: {
          id: '$_id'
        }
      },
      {
        $project: {
          _id: 0,
          id: 1,
          title: 1,
          target: 1,
          updatedAt: 1
        }
      },
      { $sort: sort }
    ];

    const aggregateQuery = this.onmapModel.aggregate(aggregation);
    return await this.onmapModel.aggregatePaginate(aggregateQuery, {
      offset,
      limit: Number(limit) > 0 ? Number(limit) : await this.onmapModel.countDocuments(),
      lean: false,
      allowDiskUse: true
    });
  }

  async findOneById(id: string): Promise<Onmap> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid inspector ID');
    }
    const inspector = await this.onmapModel.findById(id).exec();
    if (!inspector) {
      throw new NotFoundException('Inspector not found');
    }
    return inspector;
  }

  async findOneByIP(ip: string): Promise<Onmap> {
    const inspector = await this.onmapModel.findOne({ host: ip }).exec();
    if (!inspector) {
      throw new NotFoundException('Inspector not found');
    }
    return inspector;
  }

  async removeOneById(id: string): Promise<Onmap> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid inspector ID');
    }
    const deletedInspector = await this.onmapModel.findByIdAndRemove(id).exec();
    if (!deletedInspector) {
      throw new NotFoundException('Inspector not found');
    }
    return deletedInspector;
  }
}
