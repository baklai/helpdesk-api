import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const dayjs = require('dayjs');

import { Branch } from 'src/branches/schemas/branch.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { Channel } from 'src/channels/schemas/channel.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Inspector } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { Sysfilter } from 'src/sysfilters/schemas/sysfilter.schema';
import { Unit } from 'src/units/schemas/unit.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
    @InjectModel(Channel.name) private readonly channelModel: Model<Channel>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Department.name) private readonly departmentModel: Model<Department>,
    @InjectModel(Enterprise.name) private readonly enterpriseModel: Model<Enterprise>,
    @InjectModel(Inspector.name) private readonly inspectorModel: Model<Inspector>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Position.name) private readonly positionModel: Model<Position>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    @InjectModel(Sysfilter.name) private readonly filterModel: Model<Sysfilter>,
    @InjectModel(Unit.name) private readonly unitModel: Model<Unit>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async network() {
    const [
      channels,
      companies,
      branches,
      enterprises,
      departments,
      locations,
      units,
      statistic,
      barUnits,
      barLocations,
      barBranches,
      barEnterprises
    ] = await Promise.all([
      this.channelModel.countDocuments(),
      this.companyModel.countDocuments(),
      this.branchModel.countDocuments(),
      this.enterpriseModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.unitModel.countDocuments(),

      this.ipaddressModel
        .aggregate([
          {
            $facet: {
              count: [{ $count: 'count' }],
              autoanswer: [
                {
                  $match: {
                    $and: [{ autoanswer: { $ne: '' } }, { autoanswer: { $ne: '-' } }, { autoanswer: { $ne: null } }]
                  }
                },
                { $count: 'autoanswer' }
              ],
              internet: [
                {
                  $match: {
                    $and: [
                      { 'internet.mail': { $ne: null } },
                      { 'internet.dateOpen': { $ne: null } },
                      { 'internet.dateClose': null }
                    ]
                  }
                },
                { $count: 'internet' }
              ],
              email: [
                {
                  $match: {
                    $and: [
                      { 'email.mail': { $ne: null } },
                      { 'email.dateOpen': { $ne: null } },
                      { 'email.dateClose': null }
                    ]
                  }
                },
                { $count: 'email' }
              ]
            }
          },
          {
            $addFields: {
              count: { $first: '$count.count' },
              autoanswer: { $first: '$autoanswer.autoanswer' },
              internet: { $first: '$internet.internet' },
              email: { $first: '$email.email' }
            }
          }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          { $lookup: { from: 'units', localField: 'unit', foreignField: '_id', as: 'unit' } },
          { $unwind: { path: '$unit', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$unit.title', count: { $sum: 1 } } },
          { $project: { _id: 0, title: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          { $lookup: { from: 'locations', localField: 'location', foreignField: '_id', as: 'location' } },
          { $unwind: { path: '$location', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$location.title', count: { $sum: 1 } } },
          { $project: { _id: 0, title: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          { $lookup: { from: 'branches', localField: 'branch', foreignField: '_id', as: 'branch' } },
          { $unwind: { path: '$branch', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$branch.title', count: { $sum: 1 } } },
          { $project: { _id: 0, title: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          { $lookup: { from: 'enterprises', localField: 'enterprise', foreignField: '_id', as: 'enterprise' } },
          { $unwind: { path: '$enterprise', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$enterprise.title', count: { $sum: 1 } } },
          { $project: { _id: 0, title: '$_id', count: 1 } }
        ])
        .allowDiskUse(true)
    ]);

    return {
      ...statistic[0],
      channels,
      companies,
      branches,
      enterprises,
      departments,
      locations,
      units,
      barUnits,
      barLocations,
      barBranches,
      barEnterprises
    };
  }

  async request() {
    const startOfYear = dayjs().startOf('year');
    const endOfYear = dayjs().endOf('year');

    const [requests, companies, branches, enterprises, departments, locations, positions, units] = await Promise.all([
      this.requestModel.countDocuments(),
      this.companyModel.countDocuments(),
      this.branchModel.countDocuments(),
      this.enterpriseModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.positionModel.countDocuments(),
      this.unitModel.countDocuments()
    ]);

    const closed = await this.requestModel.countDocuments({ closed: { $ne: null } });
    const opened = await this.requestModel.countDocuments({ closed: { $eq: null } });

    const yearchar = await this.requestModel.aggregate([
      { $match: { createdAt: { $gte: new Date(startOfYear), $lte: new Date(endOfYear) } } },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $addFields: { month: '$_id' } },
      { $project: { _id: 0, month: 1, count: 1 } },
      { $sort: { month: 1 } }
    ]);

    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');

    const monthchar = await this.requestModel.aggregate([
      { $match: { createdAt: { $gte: new Date(startOfMonth), $lte: new Date(endOfMonth) } } },
      { $group: { _id: { $dayOfMonth: '$createdAt' }, count: { $sum: 1 } } },
      { $addFields: { day: '$_id', date: '$createdAt' } },
      { $project: { _id: 0, day: 1, date: 1, count: 1 } },
      { $sort: { day: 1 } }
    ]);

    const currentDate = dayjs();
    const daysInMonth = currentDate.daysInMonth();
    const datesOfMonth = Array.from({ length: daysInMonth }, (_, index) => {
      return { date: currentDate.date(index + 1).format('DD.MM.YY (dd)'), day: index + 1 };
    });

    const data = datesOfMonth.map(({ day, date }) => {
      return { day, date, count: monthchar.find((item) => item.day === day)?.count || 0 };
    });

    const startOfWeek = dayjs().startOf('week').startOf('day');
    const endOfWeek = dayjs().endOf('week').endOf('day');

    const weekchar = await this.requestModel.aggregate([
      { $match: { createdAt: { $gte: new Date(startOfWeek), $lte: new Date(endOfWeek) } } },
      { $group: { _id: { $dayOfWeek: '$createdAt' }, count: { $sum: 1 } } },
      { $addFields: { day: '$_id' } },
      { $project: { _id: 0, day: 1, count: 1 } },
      { $sort: { day: 1 } }
    ]);

    return {
      opened,
      closed,
      requests,
      yearchar,
      monthchar: data,
      weekchar,
      companies,
      branches,
      enterprises,
      departments,
      locations,
      positions,
      units
    };
  }

  async inspector() {
    const UNWANTED_SOFTWARE = await this.filterModel.find({ type: 'software', status: 'deny' });
    const EXCEPTION_USERACCOUNTS = await this.filterModel.find({ type: 'account', status: 'allow' });

    const [count, inspector, days, software] = await Promise.all([
      this.inspectorModel.countDocuments(),
      this.inspectorModel
        .aggregate([
          {
            $addFields: {
              useraccount: {
                $filter: {
                  input: '$useraccount',
                  as: 'item',
                  cond: {
                    $and: [
                      { $ne: ['$$item.Disabled', 1] },
                      { $not: { $in: ['$$item.Name', [...EXCEPTION_USERACCOUNTS.map((item) => item.regex)]] } }
                    ]
                  }
                }
              },

              share: {
                $filter: {
                  input: '$share',
                  as: 'item',
                  cond: { $and: [{ $ne: ['$$item.Name', 'print$'] }, { $ne: ['$$item.Name', 'prnproc$'] }] }
                }
              }
            }
          },
          {
            $project: {
              _id: 0,

              warnings: {
                useraccount: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: [{ $size: { $ifNull: ['$useraccount', []] } }, 0] },

                        {
                          $gt: [
                            { $size: { $setIntersection: [{ $ifNull: ['$useraccount.Name', []] }, '$useradmin'] } },
                            0
                          ]
                        }
                      ]
                    },
                    then: true,
                    else: false
                  }
                },

                product: {
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
                },

                share: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: [{ $size: { $ifNull: ['$share', []] } }, 0] },
                        { $gt: [{ $size: { $setIntersection: [{ $ifNull: ['$share.Type', []] }, [0]] } }, 0] }
                      ]
                    },
                    then: true,
                    else: false
                  }
                }
              }
            }
          },
          {
            $group: {
              _id: null,

              warning: {
                $sum: {
                  $cond: [
                    {
                      $or: [
                        { $eq: ['$warnings.useraccount', true] },
                        { $eq: ['$warnings.product', true] },
                        { $eq: ['$warnings.share', true] }
                      ]
                    },
                    1,
                    0
                  ]
                }
              },

              useraccount: { $sum: { $cond: [{ $eq: ['$warnings.useraccount', true] }, 1, 0] } },

              product: { $sum: { $cond: [{ $eq: ['$warnings.product', true] }, 1, 0] } },

              share: { $sum: { $cond: [{ $eq: ['$warnings.share', true] }, 1, 0] } }
            }
          },
          { $project: { _id: 0, warning: 1, useraccount: 1, product: 1, share: 1 } }
        ])
        .allowDiskUse(true),
      this.inspectorModel
        .aggregate([
          {
            $bucket: {
              groupBy: '$updatedAt',
              boundaries: [
                new Date(new Date().valueOf() - 365 * (1000 * 60 * 60 * 24)),
                new Date(new Date().valueOf() - 90 * (1000 * 60 * 60 * 24)),
                new Date(new Date().valueOf() - 60 * (1000 * 60 * 60 * 24)),
                new Date(new Date().valueOf() - 30 * (1000 * 60 * 60 * 24)),
                new Date(new Date().valueOf() - 15 * (1000 * 60 * 60 * 24)),
                new Date(new Date().valueOf() - 7 * (1000 * 60 * 60 * 24)),
                new Date(new Date().valueOf() - 1 * (1000 * 60 * 60 * 24))
              ],
              default: new Date(new Date().valueOf() - 366 * (1000 * 60 * 60 * 24)),
              output: { count: { $sum: 1 } }
            }
          },
          { $addFields: { days: { $divide: [{ $subtract: [new Date(), '$_id'] }, 1000 * 60 * 60 * 24] } } },
          { $project: { _id: 0, days: 1, count: 1 } },
          { $sort: { days: 1 } }
        ])
        .allowDiskUse(true),
      this.inspectorModel.aggregate([
        { $unwind: '$product' },
        { $group: { _id: '$product.Name', count: { $sum: 1 } } },
        { $project: { _id: 0, name: '$_id', count: 1 } },
        { $sort: { name: 1 } }
      ])
    ]);

    const [{ warning, useraccount, product, share }] = inspector;

    return {
      unsoftware: UNWANTED_SOFTWARE.map((item) => item.regex),
      software: software ? software : [],
      warning: warning,
      useraccount: useraccount,
      product: product,
      share: share,
      count: count ? count : 0,
      days: days ? days : []
    };
  }

  async dashboard() {
    const [
      users,
      inspectors,
      requests,
      ipaddress,
      channels,
      companies,
      branches,
      enterprises,
      departments,
      positions,
      locations,
      units
    ] = await Promise.all([
      this.userModel.countDocuments(),
      this.inspectorModel.countDocuments(),
      this.requestModel.countDocuments(),
      this.ipaddressModel.countDocuments(),
      this.channelModel.countDocuments(),
      this.companyModel.countDocuments(),
      this.branchModel.countDocuments(),
      this.enterpriseModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.positionModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.unitModel.countDocuments()
    ]);

    return {
      users,
      inspectors,
      requests,
      ipaddress,
      channels,
      companies,
      branches,
      enterprises,
      departments,
      positions,
      locations,
      units
    };
  }
}
