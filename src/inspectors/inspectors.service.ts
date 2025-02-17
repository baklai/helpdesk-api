import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, AggregatePaginateModel, AggregatePaginateResult, Model } from 'mongoose';
import { isIP } from 'class-validator';

import { Filter } from 'src/filters/schemas/filter.schema';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Inspector } from './schemas/inspector.schema';
import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';

@Injectable()
export class InspectorsService {
  constructor(
    @InjectModel(Inspector.name) private readonly inspectorModel: AggregatePaginateModel<Inspector>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Filter.name) private readonly sysfilterModel: Model<Filter>
  ) {}

  async create(host: string, field: string, createInspectorDto: Record<string, any>) {
    await this.inspectorModel
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

  async findAll(query: PaginateQueryDto): Promise<AggregatePaginateResult<Inspector>> {
    const { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} } = query;

    const inspector = {};

    const UNWANTED_SOFTWARE = await this.sysfilterModel.find({});
    const EXCEPTION_USERACCOUNTS = await this.sysfilterModel.find({});

    if (filters?.warning) {
      switch (filters.warning) {
        case 'ipaddress':
          inspector['ipaddress'] = false;
          break;
        case 'useraccount':
          inspector['inspector.useraccount.warning'] = true;
          break;
        case 'product':
          inspector['inspector.product.warning'] = true;
          break;
        case 'share':
          inspector['inspector.share.warning'] = true;
          break;
        case 'all':
          inspector['$or'] = [
            { 'inspector.useraccount.warning': true },
            { 'inspector.product.warning': true },
            { 'inspector.share.warning': true }
          ];
          break;
      }
      delete filters.warning;
    }

    if (filters?.updatedAt?.$gte && filters?.updatedAt?.$lt) {
      filters.updatedAt.$gte = new Date(filters?.updatedAt.$gte);
      filters.updatedAt.$lt = new Date(filters?.updatedAt.$lt);
    }

    const aggregation = [
      {
        $match: filters
      },
      {
        $lookup: {
          from: 'ipaddresses',
          localField: 'host',
          foreignField: 'ipaddress',
          as: 'hostAndIp'
        }
      },
      {
        $addFields: {
          id: '$_id',

          baseboard: '$baseboard.SerialNumber',

          system: {
            csname: '$os.CSName',
            osname: '$os.Caption',
            platform: '$os.OSArchitecture',
            version: '$os.Version'
          },

          cpu: { $trim: { input: '$cpu.Name' } },

          hdd: {
            $reduce: {
              input: '$diskdrive',
              initialValue: 0,
              in: {
                $sum: [
                  {
                    $convert: {
                      input: '$$this.Size',
                      to: 'long',
                      onError: 0,
                      onNull: 0
                    }
                  },
                  '$$value'
                ]
              }
            }
          },

          ram: {
            $reduce: {
              input: '$memorychip',
              initialValue: 0,
              in: {
                $sum: [
                  {
                    $convert: {
                      input: '$$this.Capacity',
                      to: 'long',
                      onError: 0,
                      onNull: 0
                    }
                  },
                  '$$value'
                ]
              }
            }
          },

          warningUseraccount: {
            $filter: {
              input: '$useraccount',
              as: 'item',
              cond: {
                $and: [
                  {
                    $ne: ['$$item.Disabled', 1]
                  },
                  {
                    $not: {
                      $in: ['$$item.Name', [...EXCEPTION_USERACCOUNTS.map(({ regex }) => regex)]]
                    }
                  }
                ]
              }
            }
          },

          warningShare: {
            $filter: {
              input: '$share',
              as: 'item',
              cond: {
                $and: [
                  {
                    $ne: ['$$item.Name', 'print$']
                  },
                  {
                    $ne: ['$$item.Name', 'prnproc$']
                  }
                ]
              }
            }
          },

          ipaddress: {
            $cond: { if: { $gt: [{ $size: '$hostAndIp' }, 0] }, then: true, else: false }
          }
        }
      },
      {
        $project: {
          _id: 0,
          id: 1,
          baseboard: 1,
          host: 1,
          system: 1,
          cpu: 1,
          ram: 1,
          hdd: 1,
          fixupdate: {
            $size: { $ifNull: ['$fixupdate', []] }
          },
          inspector: {
            useraccount: {
              count: {
                $size: { $ifNull: ['$useraccount', []] }
              },
              warning: {
                $cond: {
                  if: {
                    $and: [
                      { $gt: [{ $size: { $ifNull: ['$warningUseraccount', []] } }, 0] },

                      {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: [
                                { $ifNull: ['$warningUseraccount.Name', []] },
                                '$useradmin'
                              ]
                            }
                          },
                          0
                        ]
                      }
                    ]
                  },
                  then: true,
                  else: false
                }
              }
            },

            product: {
              count: {
                $size: { $ifNull: ['$product', []] }
              },
              warning: {
                $cond: {
                  if: {
                    $and: [
                      { $gt: [{ $size: { $ifNull: ['$product', []] } }, 0] },
                      {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: [
                                { $ifNull: ['$product.Name', []] },
                                [...UNWANTED_SOFTWARE.map(({ regex }) => regex)]
                              ]
                            }
                          },
                          0
                        ]
                      }
                    ]
                  },
                  then: true,
                  else: false
                }
              }
            },

            share: {
              count: {
                $size: { $ifNull: ['$share', []] }
              },
              warning: {
                $cond: {
                  if: {
                    $and: [
                      { $gt: [{ $size: { $ifNull: ['$warningShare', []] } }, 0] },
                      {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: [{ $ifNull: ['$warningShare.Type', []] }, [0]]
                            }
                          },
                          0
                        ]
                      }
                    ]
                  },
                  then: true,
                  else: false
                }
              }
            }
          },
          ipaddress: 1,
          updatedAt: 1
        }
      },
      { $match: inspector },
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

  async findOneById(
    id: string,
    populate: boolean = false,
    aggregate: boolean = false
  ): Promise<Inspector | any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const inspector = await this.inspectorModel.findById(id).exec();
    if (!inspector) {
      throw new NotFoundException('Запис не знайдено');
    }
    if (!aggregate) return inspector;
    const ipaddress = await this.ipaddressModel
      .findOne({ ipaddress: inspector.host }, null, {
        autopopulate: populate
      })
      .exec();
    return { inspector, ipaddress };
  }

  async findOneByHost(
    host: string,
    populate: boolean = false,
    aggregate: boolean = false
  ): Promise<Inspector | any> {
    if (!isIP(host)) {
      throw new BadRequestException('Недійсне значення поля');
    }
    const inspector = await this.inspectorModel.findOne({ host }).exec();
    if (!inspector) {
      throw new NotFoundException('Запис не знайдено');
    }
    if (!aggregate) return inspector;
    const ipaddress = await this.ipaddressModel
      .findOne({ ipaddress: inspector.host }, null, {
        autopopulate: populate
      })
      .exec();
    return { inspector, ipaddress };
  }

  async removeOneById(id: string): Promise<Inspector> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const deletedInspector = await this.inspectorModel.findByIdAndRemove(id).exec();
    if (!deletedInspector) {
      throw new NotFoundException('Запис не знайдено');
    }
    return deletedInspector;
  }
}
