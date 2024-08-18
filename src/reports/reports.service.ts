import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { dateToLocaleStr, getObjField } from 'src/common/utils/lib.util';
import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Inspector } from 'src/inspectors/schemas/inspector.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';
import { Filter } from 'src/filters/schemas/filter.schema';

import { Report } from './schemas/report.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<Report>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Inspector.name) private readonly inspectorModel: Model<Inspector>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    @InjectModel(Filter.name) private readonly sysfilterModel: Model<Filter>
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    try {
      return await this.reportModel.create(createReportDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Report[]> {
    return await this.reportModel
      .find({})
      .select({ creator: 1, name: 1, description: 1, createdAt: 1, updatedAt: 1 })
      .sort({ updatedAt: 1 })
      .exec();
  }

  async findOneById(id: string): Promise<Report> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const report = await this.reportModel.findById(id).exec();
    if (!report) {
      throw new NotFoundException('Record not found');
    }
    return report;
  }

  async updateOneById(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    try {
      const updatedReport = await this.reportModel
        .findByIdAndUpdate(id, { $set: updateReportDto }, { new: true })
        .exec();
      if (!updatedReport) {
        throw new NotFoundException('record not found');
      }
      return updatedReport;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('A record with the same name already exists');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Report> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }

    const deletedReport = await this.reportModel.findByIdAndRemove(id).exec();

    if (!deletedReport) {
      throw new NotFoundException('Record not found');
    }

    return deletedReport;
  }

  async reportOneById(id: string): Promise<Record<string, any>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }

    const report = await this.reportModel.findById(id).exec();

    if (!report) {
      throw new NotFoundException('Record not found');
    }

    const { datacollection, fields = '{}', sorts = '{"createdAt": 1}', filters = '{}' } = report;

    const reportData = [];

    const jsonSorts = JSON.parse(sorts);
    const jsonFields = JSON.parse(fields);
    const jsonFilters = JSON.parse(filters);

    switch (datacollection) {
      case 'ipaddresses':
        if (jsonFilters?.internet) {
          switch (jsonFilters?.internet['$regex']) {
            case '^opened$':
              jsonFilters['internet.dateOpen'] = { $ne: null };
              jsonFilters['internet.dateClose'] = null;
              break;
            case '^closed$':
              jsonFilters['internet.dateOpen'] = { $ne: null };
              jsonFilters['internet.dateClose'] = { $ne: null };
              break;
            case '^missing$':
              jsonFilters['internet'] = { $ne: null };
              jsonFilters['internet.mail'] = null;
              jsonFilters['internet.dateOpen'] = null;
              jsonFilters['internet.dateClose'] = null;
              break;
          }
          delete jsonFilters.internet;
        }
        const ipaddresses = await this.ipaddressModel.find(jsonFilters).sort(jsonSorts).exec();
        reportData.push(...ipaddresses);
        break;
      case 'mailboxes':
        if (jsonFilters?.status) {
          switch (jsonFilters?.status) {
            case true:
            case 'true':
              jsonFilters['dateOpen'] = { $ne: null };
              jsonFilters['dateClose'] = null;
              break;
            case false:
            case 'false':
              jsonFilters['dateOpen'] = { $ne: null };
              jsonFilters['dateClose'] = { $ne: null };
              break;
            default:
              break;
          }
          delete jsonFilters.status;
        }
        const mailboxes = await this.mailboxModel.find(jsonFilters).sort(jsonSorts).exec();
        reportData.push(...mailboxes);
        break;
      case 'requests':
        if (jsonFilters?.status) {
          switch (jsonFilters?.status) {
            case true:
            case 'true':
              jsonFilters['workerClose'] = { $ne: null };
              break;
            case false:
            case 'false':
              jsonFilters['workerClose'] = null;
              break;
            default:
              break;
          }
          delete jsonFilters.status;
        }
        const requests = await this.requestModel.find(jsonFilters).sort(jsonSorts).exec();
        reportData.push(...requests);
        break;
      case 'inspectors':
        const inspector = {};

        const UNWANTED_SOFTWARE = await this.sysfilterModel.find({});
        const EXCEPTION_USERACCOUNTS = await this.sysfilterModel.find({});

        if (jsonFilters?.warning) {
          switch (jsonFilters.warning) {
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
          delete jsonFilters.warning;
        }

        if (jsonFilters?.updatedAt?.$gte && jsonFilters?.updatedAt?.$lt) {
          jsonFilters.updatedAt.$gte = new Date(jsonFilters?.updatedAt.$gte);
          jsonFilters.updatedAt.$lt = new Date(jsonFilters?.updatedAt.$lt);
        }

        const aggregation = [
          {
            $match: jsonFilters
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
                          $in: [
                            '$$item.Name',
                            [...EXCEPTION_USERACCOUNTS.map(({ regex }) => regex)]
                          ]
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
              updatedAt: 1
            }
          },
          { $match: inspector },
          { $sort: jsonSorts }
        ];

        const inspectors = await this.inspectorModel.aggregate(aggregation).exec();
        reportData.push(...inspectors);
        break;
      default:
        throw new NotFoundException('Data collection not found');
    }

    return reportData.map((item, index) => {
      const parsedFields = jsonFields as Record<string, string>;
      const updatedObj = Object.entries(parsedFields).reduce((acc, [key, value]) => {
        const aValue = getObjField(item, key, '-');
        acc[value] =
          aValue === true
            ? '✅'
            : aValue === false
              ? '🚫'
              : aValue instanceof Date
                ? dateToLocaleStr(aValue.toString())
                : aValue;
        return acc;
      }, {});

      return {
        '№': (++index).toString(),
        ...updatedObj
      };
    });
  }
}
