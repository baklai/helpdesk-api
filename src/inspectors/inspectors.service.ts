import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isIP } from 'class-validator';
import type { AggregatePaginateModel, AggregatePaginateResult } from 'mongoose';
import { Types } from 'mongoose';

import { PaginateArgs } from 'src/common/dto/paginate.args';
import { sanitizeMongoFilters } from 'src/common/utils/lib.util';

import { CreateInspectorInput } from './dto/create-inspector.input';
import { InspectorEntity } from './entities/inspector.entity';
import { Inspector, InspectorDocument } from './models/inspector.schema';

@Injectable()
export class InspectorsService {
  constructor(
    @InjectModel(Inspector.name)
    private readonly inspectorModel: AggregatePaginateModel<InspectorDocument>
  ) {}

  async create(ipaddress: string, input: CreateInspectorInput): Promise<boolean> {
    if (!isIP(ipaddress)) {
      throw new BadRequestException('Недійсний формат IPv4-адреси');
    }

    try {
      await this.inspectorModel
        .findOneAndUpdate(
          { ipaddress },
          { $set: { ...input, ipaddress } },
          { returnDocument: 'after', upsert: true }
        )
        .exec();

      return true;
    } catch {
      throw new UnprocessableEntityException(
        'Не вдалося створити запис. Перевірте коректність даних'
      );
    }
  }

  async findAll(args: PaginateArgs): Promise<AggregatePaginateResult<InspectorEntity>> {
    const { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} } = args;

    const safeFilters = sanitizeMongoFilters(filters);

    const aggregation = [
      { $match: safeFilters },

      {
        $lookup: {
          from: 'ipaddresses',
          localField: 'ipaddress',
          foreignField: 'ipaddress',
          as: 'IpAndIp'
        }
      },

      {
        $set: {
          id: '$_id',
          baseboardName: '$baseboard.SerialNumber',

          system: {
            csname: '$os.CSName',
            osname: '$os.Caption',
            platform: '$os.OSArchitecture',
            version: '$os.Version'
          },

          cpuName: {
            $reduce: {
              input: {
                $map: {
                  input: '$cpu',
                  as: 'item',
                  in: { $trim: { input: '$$item.Name' } }
                }
              },
              initialValue: '',
              in: {
                $concat: ['$$value', { $cond: [{ $eq: ['$$value', ''] }, '', ', '] }, '$$this']
              }
            }
          },

          hddSize: {
            $reduce: {
              input: '$diskdrive',
              initialValue: 0,
              in: {
                $add: [
                  '$$value',
                  {
                    $convert: {
                      input: '$$this.Size',
                      to: 'long',
                      onError: 0,
                      onNull: 0
                    }
                  }
                ]
              }
            }
          },

          ramSize: {
            $reduce: {
              input: '$memorychip',
              initialValue: 0,
              in: {
                $add: [
                  '$$value',
                  {
                    $convert: {
                      input: '$$this.Capacity',
                      to: 'long',
                      onError: 0,
                      onNull: 0
                    }
                  }
                ]
              }
            }
          },

          isIpaddress: {
            $gt: [{ $size: '$IpAndIp' }, 0]
          }
        }
      },

      {
        $project: {
          _id: 0,
          id: 1,
          ipaddress: 1,
          baseboardName: 1,
          system: 1,
          cpuName: 1,
          ramSize: 1,
          hddSize: 1,
          isIpaddress: 1,
          countFixupdate: { $size: { $ifNull: ['$fixupdate', []] } },
          countUseraccount: { $size: { $ifNull: ['$useraccount', []] } },
          countProduct: { $size: { $ifNull: ['$product', []] } },
          countShare: { $size: { $ifNull: ['$share', []] } },
          createdAt: 1,
          updatedAt: 1
        }
      },

      { $sort: sort }
    ];

    const aggregateQuery = this.inspectorModel.aggregate(aggregation);

    return await this.inspectorModel.aggregatePaginate(aggregateQuery, {
      offset,
      limit,
      lean: false,
      allowDiskUse: true
    });
  }

  async findOneById(id: string): Promise<InspectorEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const inspector = await this.inspectorModel.findById(id).exec();

    if (!inspector) {
      throw new NotFoundException('Запис не знайдено');
    }

    return inspector;
  }

  async findOneByIP(ipaddress: string): Promise<InspectorEntity> {
    if (!isIP(ipaddress)) {
      throw new BadRequestException('Недійсне значення поля');
    }

    const inspector = await this.inspectorModel.findOne({ ipaddress }).exec();

    if (!inspector) {
      throw new NotFoundException('Запис не знайдено');
    }

    return inspector;
  }

  async removeOneById(id: string): Promise<InspectorEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const deletedInspector = await this.inspectorModel.findByIdAndDelete(id).exec();

    if (!deletedInspector) {
      throw new NotFoundException('Запис не знайдено');
    }

    return deletedInspector;
  }
}
