import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types, AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as nmap from 'libnmap';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Onmap } from './schemas/onmap.schema';
import { CreateOnmapDto } from './dto/create-onmap.dto';

@Injectable()
export class OnmapsService {
  constructor(
    @InjectModel(Onmap.name) private readonly onmapModel: AggregatePaginateModel<Onmap>
  ) {}

  async create(createOnmapDto: CreateOnmapDto) {
    const { title, target, profile, flags } = createOnmapDto;
    const opts = {
      json: true,
      timeout: 900,
      flags: flags,
      ports: null,
      range: [target]
    };
    nmap.scan(opts, async (err: any, report: any) => {
      if (err) {
        return new Error(err.message);
      } else {
        for (const item in report) {
          try {
            await this.onmapModel.create({
              title: title || `ONMAP Сканування ${target}`,
              target: item,
              profile: profile,
              flags: opts.flags || flags || [],
              ...report[item]
            });
          } catch (err) {
            return new Error(err.message);
          }
        }
        return true;
      }
    });
  }

  async findAll(query: PaginateQueryDto): Promise<AggregatePaginateResult<Onmap>> {
    const { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} } = query;
    if (filters?.updatedAt?.$gte && filters?.updatedAt?.$lt) {
      filters.updatedAt.$gte = new Date(filters?.updatedAt.$gte);
      filters.updatedAt.$lt = new Date(filters?.updatedAt.$lt);
    }
    const aggregation = [
      {
        $unwind: '$runstats'
      },
      {
        $unwind: '$runstats.hosts'
      },
      {
        $match: filters
      },
      {
        $addFields: {
          id: '$_id',
          upHost: {
            $toInt: '$runstats.hosts.item.up'
          }
        }
      },
      {
        $project: {
          _id: 0,
          id: 1,
          title: 1,
          target: 1,
          profile: 1,
          flags: 1,
          upHost: 1,
          updatedAt: 1
        }
      },
      { $sort: sort }
    ];
    const aggregateQuery = this.onmapModel.aggregate(aggregation);
    return await this.onmapModel.aggregatePaginate(aggregateQuery, {
      offset,
      limit,
      lean: false,
      allowDiskUse: true
    });
  }

  async findOneById(id: string): Promise<Onmap> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const report = await this.onmapModel.findById(id).exec();
    if (!report) {
      throw new NotFoundException('Запис не знайдено');
    }
    return report;
  }

  async removeOneById(id: string): Promise<Onmap> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const deletedInspector = await this.onmapModel.findByIdAndRemove(id).exec();
    if (!deletedInspector) {
      throw new NotFoundException('Запис не знайдено');
    }
    return deletedInspector;
  }
}
