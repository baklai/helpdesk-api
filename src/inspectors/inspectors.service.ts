import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, AggregatePaginateModel, AggregatePaginateResult, Model } from 'mongoose';

import { Sysfilter } from 'src/sysfilters/schemas/sysfilter.schema';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

import { Inspector } from './schemas/inspector.schema';
import { CreateInspectorDto } from './dto/create-inspector.dto';
import { UpdateInspectorDto } from './dto/update-inspector.dto';

@Injectable()
export class InspectorsService {
  constructor(
    @InjectModel(Inspector.name) private readonly inspectorModel: AggregatePaginateModel<Inspector>,
    @InjectModel(Sysfilter.name) private readonly sysfilterModel: Model<Sysfilter>
  ) {}

  async create(createInspectorDto: CreateInspectorDto): Promise<Inspector> {
    return await this.inspectorModel.create(createInspectorDto);
  }

  async findAll(query: PaginateQueryDto): Promise<AggregatePaginateResult<Inspector>> {
    const { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} } = query;

    const inspector = {};

    const UNWANTED_SOFTWARE = await this.sysfilterModel.find({});
    const EXCEPTION_USERACCOUNTS = await this.sysfilterModel.find({});

    if (filters?.warning) {
      switch (filters.warning) {
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
                      $in: ['$$item.Name', [...EXCEPTION_USERACCOUNTS.map((item) => item.regex)]]
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
                              $setIntersection: [{ $ifNull: ['$warningUseraccount.Name', []] }, '$useradmin']
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
                                [...UNWANTED_SOFTWARE.map((item) => item.regex)]
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
          updatedAt: 1
        }
      },
      { $match: inspector },
      { $sort: sort }
    ];

    const aggregateQuery = this.inspectorModel.aggregate(aggregation);
    return await this.inspectorModel.aggregatePaginate(aggregateQuery, {
      offset,
      limit: Number(limit) > 0 ? Number(limit) : await this.inspectorModel.countDocuments(),
      lean: false,
      allowDiskUse: true
    });
  }

  async findOneById(id: string): Promise<Inspector> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid channel ID');
    }
    const inspector = await this.inspectorModel.findById(id).exec();
    if (!inspector) {
      throw new NotFoundException('Channel not found');
    }
    return inspector;
  }

  async updateOneById(id: string, updateInspectorDto: UpdateInspectorDto): Promise<Inspector> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid inspector ID');
    }
    const updatedInspector = await this.inspectorModel
      .findByIdAndUpdate(id, { $set: updateInspectorDto }, { new: true })
      .exec();
    if (!updatedInspector) {
      throw new NotFoundException('Inspector not found');
    }
    return updatedInspector;
  }

  async removeOneById(id: string): Promise<Inspector> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid channel ID');
    }
    const deletedInspector = await this.inspectorModel.findByIdAndRemove(id).exec();
    if (!deletedInspector) {
      throw new NotFoundException('Inspector not found');
    }
    return deletedInspector;
  }
}
