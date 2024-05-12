import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';

import { Location } from 'src/locations/schemas/location.schema';
import { Channel } from 'src/channels/schemas/channel.schema';
import { Organization } from 'src/organizations/schemas/organization.schema';
import { Subdivision } from 'src/subdivisions/schemas/subdivision.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Inspector } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { Filter } from 'src/filters/schemas/filter.schema';
import { Unit } from 'src/units/schemas/unit.schema';
import { Profile } from 'src/profiles/schemas/profile.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';
import { Syslog } from 'src/syslogs/schemas/syslog.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Channel.name) private readonly channelModel: Model<Channel>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    @InjectModel(Inspector.name) private readonly inspectorModel: Model<Inspector>,
    @InjectModel(Organization.name) private readonly organizationModel: Model<Organization>,
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<Subdivision>,
    @InjectModel(Department.name) private readonly departmentModel: Model<Department>,
    @InjectModel(Unit.name) private readonly unitModel: Model<Unit>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Position.name) private readonly positionModel: Model<Position>,
    @InjectModel(Filter.name) private readonly filterModel: Model<Filter>,
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    @InjectModel(Syslog.name) private readonly syslogModel: Model<Syslog>
  ) {}

  async network() {
    const [
      channels,
      mailboxes,
      ipaddresses,
      companies,
      branches,
      enterprises,
      departments,
      locations,
      units,
      statistic,
      barUnits,
      barLocations
    ] = await Promise.all([
      this.channelModel.countDocuments(),
      this.mailboxModel.countDocuments(),
      this.ipaddressModel.countDocuments(),
      this.organizationModel.countDocuments(),
      this.subdivisionModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.unitModel.countDocuments(),

      this.ipaddressModel
        .aggregate([
          {
            $facet: {
              autoanswers: [
                {
                  $match: {
                    $and: [
                      { autoanswer: { $ne: '' } },
                      { autoanswer: { $ne: '-' } },
                      { autoanswer: { $ne: null } }
                    ]
                  }
                },
                { $count: 'count' }
              ],
              internets: [
                {
                  $match: {
                    $and: [
                      { 'internet.reqnum': { $ne: null } },
                      { 'internet.dateOpen': { $ne: null } },
                      { 'internet.dateClose': null }
                    ]
                  }
                },
                { $count: 'count' }
              ]
            }
          },
          {
            $addFields: {
              autoanswers: { $first: '$autoanswers.count' },
              internets: { $first: '$internets.count' }
            }
          }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          { $lookup: { from: 'units', localField: 'unit', foreignField: '_id', as: 'unit' } },
          { $unwind: { path: '$unit', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$unit.name', count: { $sum: 1 } } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          {
            $lookup: {
              from: 'locations',
              localField: 'location',
              foreignField: '_id',
              as: 'location'
            }
          },
          { $unwind: { path: '$location', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$location.name', count: { $sum: 1 } } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          {
            $lookup: { from: 'branches', localField: 'branch', foreignField: '_id', as: 'branch' }
          },
          { $unwind: { path: '$branch', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$branch.name', count: { $sum: 1 } } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          {
            $lookup: {
              from: 'enterprises',
              localField: 'enterprise',
              foreignField: '_id',
              as: 'enterprise'
            }
          },
          { $unwind: { path: '$enterprise', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$enterprise.name', count: { $sum: 1 } } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true)
    ]);

    const [{ autoanswers, internets }] = statistic;

    return {
      autoanswers,
      internets,
      channels,
      mailboxes,
      ipaddresses,
      companies,
      branches,
      enterprises,
      departments,
      locations,
      units,
      barUnits,
      barLocations
    };
  }

  async request() {
    const startOfYear = dayjs().startOf('year');
    const endOfYear = dayjs().endOf('year');

    const [requests, organizations, subdivisions, departments, locations, positions, units] =
      await Promise.all([
        this.requestModel.countDocuments(),
        this.organizationModel.countDocuments(),
        this.subdivisionModel.countDocuments(),
        this.departmentModel.countDocuments(),
        this.locationModel.countDocuments(),
        this.positionModel.countDocuments(),
        this.unitModel.countDocuments()
      ]);

    const closed = await this.requestModel.countDocuments({ closed: { $ne: null } });
    const opened = await this.requestModel.countDocuments({ closed: { $eq: null } });

    const yearchar = await this.requestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startOfYear.toDate()), $lte: new Date(endOfYear.toDate()) }
        }
      },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $addFields: { month: '$_id' } },
      { $project: { _id: 0, month: 1, count: 1 } },
      { $sort: { month: 1 } }
    ]);

    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');

    const monthchar = await this.requestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startOfMonth.toDate()), $lte: new Date(endOfMonth.toDate()) }
        }
      },
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
      return { day, date, count: monthchar.find(item => item.day === day)?.count || 0 };
    });

    const startOfWeek = dayjs().startOf('week').startOf('day');
    const endOfWeek = dayjs().endOf('week').endOf('day');

    const weekchar = await this.requestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startOfWeek.toDate()), $lte: new Date(endOfWeek.toDate()) }
        }
      },
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
      organizations,
      subdivisions,
      departments,
      locations,
      positions,
      units
    };
  }

  async inspector() {
    const UNWANTED_SOFTWARE = await this.filterModel.find({ type: 'software', status: 'deny' });
    const EXCEPTION_USERACCOUNTS = await this.filterModel.find({
      type: 'account',
      status: 'allow'
    });

    const [count, inspector, days] = await Promise.all([
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
                      {
                        $not: {
                          $in: ['$$item.Name', [...EXCEPTION_USERACCOUNTS.map(item => item.regex)]]
                        }
                      }
                    ]
                  }
                }
              },

              share: {
                $filter: {
                  input: '$share',
                  as: 'item',
                  cond: {
                    $and: [{ $ne: ['$$item.Name', 'print$'] }, { $ne: ['$$item.Name', 'prnproc$'] }]
                  }
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
                            {
                              $size: {
                                $setIntersection: [
                                  { $ifNull: ['$useraccount.Name', []] },
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
                                  [...UNWANTED_SOFTWARE.map(item => item.regex)]
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
                        {
                          $gt: [
                            {
                              $size: { $setIntersection: [{ $ifNull: ['$share.Type', []] }, [0]] }
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
          {
            $addFields: {
              days: { $divide: [{ $subtract: [new Date(), '$_id'] }, 1000 * 60 * 60 * 24] }
            }
          },
          { $project: { _id: 0, days: 1, count: 1 } },
          { $sort: { days: 1 } }
        ])
        .allowDiskUse(true)

      // this.inspectorModel.aggregate([
      //   { $unwind: '$product' },
      //   { $group: { _id: '$product.Name', count: { $sum: 1 } } },
      //   { $project: { _id: 0, name: '$_id', count: 1 } },
      //   { $sort: { name: 1 } }
      // ])
    ]);

    const [{ warning, useraccount, product, share }] = inspector;

    return {
      // unsoftware: UNWANTED_SOFTWARE.map(item => item.regex),
      // software: software ? software : [],
      warning: warning,
      useraccount: useraccount,
      product: product,
      share: share,
      count: count ? count : 0,
      days: days ? days : []
    };
  }

  async dashboard() {
    const currentDate = new Date();
    const firstDayOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    const [
      profiles,
      inspectors,
      requests,
      ipaddress,
      channels,
      organizations,
      subdivisions,
      departments,
      positions,
      locations,
      units,
      activity,
      activityProfiles
    ] = await Promise.all([
      this.profileModel.countDocuments(),
      this.inspectorModel.countDocuments(),
      this.requestModel.countDocuments(),
      this.ipaddressModel.countDocuments(),
      this.channelModel.countDocuments(),
      this.organizationModel.countDocuments(),
      this.subdivisionModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.positionModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.unitModel.countDocuments(),
      this.syslogModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayOfPreviousMonth,
              $lt: currentDate
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day'
              }
            },
            count: 1
          }
        },
        {
          $sort: {
            date: 1
          }
        }
      ]),
      this.syslogModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayOfPreviousMonth,
              $lte: lastDayOfPreviousMonth
            },
            profile: {
              $nin: ['anonymous', 'system']
            }
          }
        },
        {
          $group: {
            _id: {
              profile: '$profile',
              method: '$method'
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: '$_id.profile',
            methods: {
              $push: {
                method: '$_id.method',
                count: '$count'
              }
            }
          }
        },
        {
          $project: {
            profile: '$_id',
            methods: 1,
            _id: 0
          }
        }
      ])
    ]);

    return {
      profiles,
      inspectors,
      requests,
      ipaddress,
      channels,
      organizations,
      subdivisions,
      departments,
      positions,
      locations,
      units,
      activity,
      activityProfiles
    };
  }
}
