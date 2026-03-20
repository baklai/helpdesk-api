import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Channel, ChannelDocument } from 'src/channels/models/channel.schema';
import { MailboxStatusType } from 'src/common/enums/status.enum';
import { Department, DepartmentDocument } from 'src/departments/models/department.schema';
import { Device, DeviceDocument } from 'src/devices/models/device.schema';
import { Inspector, InspectorDocument } from 'src/inspectors/models/inspector.schema';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Location, LocationDocument } from 'src/locations/models/location.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { Organization, OrganizationDocument } from 'src/organizations/models/organization.schema';
import { Position, PositionDocument } from 'src/positions/models/position.schema';
import { Request, RequestDocument } from 'src/requests/models/request.schema';
import { Subdivision, SubdivisionDocument } from 'src/subdivisions/models/subdivision.schema';
import { SysLog, SysLogDocument } from 'src/syslogs/models/syslog.schema';
import { User, UserDocument } from 'src/users/models/user.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Channel.name) private readonly channelModel: Model<ChannelDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>,
    @InjectModel(Inspector.name) private readonly inspectorModel: Model<InspectorDocument>,
    @InjectModel(Organization.name) private readonly organizationModel: Model<OrganizationDocument>,
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<SubdivisionDocument>,
    @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel(Device.name) private readonly deviceModel: Model<DeviceDocument>,
    @InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>,
    @InjectModel(Position.name) private readonly positionModel: Model<PositionDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(SysLog.name) private readonly syslogModel: Model<SysLogDocument>
  ) {}

  private getStartAndEndDateOfWeek = (date: Date) => {
    const firstDayOfWeek = 1;
    const day = date.getDay();
    const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  };

  private getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  private formatDate = (date: Date): string => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    return `${dd}.${mm}.${yy} (${dayName})`;
  };

  async network(): Promise<Record<string, any>> {
    const [
      ipaddresses,
      channels,
      internets,
      autoanswers,
      IPByDevices,
      IPByLocations,
      IPByOrganizations,
      IPBySubdivisions,
      IPByDepartments
    ] = await Promise.all([
      this.ipaddressModel.countDocuments(),
      this.channelModel.countDocuments(),
      this.ipaddressModel
        .aggregate([
          {
            $match: {
              'internet.reqnum': { $ne: null },
              'internet.dateOpen': { $ne: null },
              'internet.dateClose': null
            }
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              count: { $ifNull: ['$count', 0] }
            }
          }
        ])
        .allowDiskUse(true)
        .then(res => res[res.length - 1]?.count ?? 0),

      this.ipaddressModel
        .aggregate([
          {
            $match: {
              autoanswer: { $nin: ['', '-', null] }
            }
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              count: { $ifNull: ['$count', 0] }
            }
          }
        ])
        .allowDiskUse(true)
        .then(res => res[res.length - 1]?.count ?? 0),

      this.ipaddressModel
        .aggregate([
          { $lookup: { from: 'devices', localField: 'device', foreignField: '_id', as: 'device' } },
          { $unwind: { path: '$device', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$device.name', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
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
          { $sort: { count: -1 } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          {
            $lookup: {
              from: 'organizations',
              localField: 'organization',
              foreignField: '_id',
              as: 'organization'
            }
          },
          { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$organization.name', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          {
            $lookup: {
              from: 'subdivisions',
              localField: 'subdivision',
              foreignField: '_id',
              as: 'subdivision'
            }
          },
          { $unwind: { path: '$subdivision', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$subdivision.name', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.ipaddressModel
        .aggregate([
          {
            $lookup: {
              from: 'departments',
              localField: 'department',
              foreignField: '_id',
              as: 'department'
            }
          },
          { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$department.name', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true)
    ]);

    return {
      ipaddresses,
      channels,
      internets,
      autoanswers,
      IPByDevices,
      IPByLocations,
      IPByOrganizations,
      IPBySubdivisions,
      IPByDepartments
    };
  }

  async mailbox(): Promise<Record<string, any>> {
    const [mailboxes, statuses, MailboxByOrganizations, MailboxBySubdivisions] = await Promise.all([
      this.mailboxModel.countDocuments(),

      this.mailboxModel
        .aggregate([
          {
            $group: {
              _id: null,
              opened: { $sum: { $cond: [{ $eq: ['$status', MailboxStatusType.OPENED] }, 1, 0] } },
              blocked: { $sum: { $cond: [{ $eq: ['$status', MailboxStatusType.BLOCKED] }, 1, 0] } },
              closed: { $sum: { $cond: [{ $eq: ['$status', MailboxStatusType.CLOSED] }, 1, 0] } }
            }
          },
          { $project: { _id: 0 } }
        ])
        .then(res => res[res.length - 1] ?? {}),

      this.mailboxModel
        .aggregate([
          {
            $lookup: {
              from: 'organizations',
              localField: 'organization',
              foreignField: '_id',
              as: 'organization'
            }
          },
          { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$organization.name', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true),

      this.mailboxModel
        .aggregate([
          {
            $lookup: {
              from: 'subdivisions',
              localField: 'subdivision',
              foreignField: '_id',
              as: 'subdivision'
            }
          },
          { $unwind: { path: '$subdivision', preserveNullAndEmptyArrays: true } },
          { $group: { _id: '$subdivision.name', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, name: '$_id', count: 1 } }
        ])
        .allowDiskUse(true)
    ]);

    return {
      mailboxes,
      mailboxesOpened: statuses?.opened || 0,
      mailboxesBlocked: statuses?.blocked || 0,
      mailboxesClosed: statuses?.closed || 0,
      MailboxByOrganizations,
      MailboxBySubdivisions
    };
  }

  async request(): Promise<Record<string, any>> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const startOfYear = new Date(year, 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

    const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const [requests, organizations, subdivisions, departments, locations, positions, devices] =
      await Promise.all([
        this.requestModel.countDocuments(),
        this.organizationModel.countDocuments(),
        this.subdivisionModel.countDocuments(),
        this.departmentModel.countDocuments(),
        this.locationModel.countDocuments(),
        this.positionModel.countDocuments(),
        this.deviceModel.countDocuments()
      ]);

    const closed = await this.requestModel.countDocuments({ closed: { $ne: null } });
    const opened = await this.requestModel.countDocuments({ closed: { $eq: null } });

    const yearchar = await this.requestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear }
        }
      },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $addFields: { month: '$_id' } },
      { $project: { _id: 0, month: 1, count: 1 } },
      { $sort: { month: 1 } }
    ]);

    const monthchar = await this.requestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      { $group: { _id: { $dayOfMonth: '$createdAt' }, count: { $sum: 1 } } },
      { $addFields: { day: '$_id', date: '$createdAt' } },
      { $project: { _id: 0, day: 1, date: 1, count: 1 } },
      { $sort: { day: 1 } }
    ]);

    const daysInMonth = this.getDaysInMonth(year, month);
    const datesOfMonth = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);
      return { date: this.formatDate(date), day: index + 1 };
    });

    const data = datesOfMonth.map(({ day, date }) => {
      return { day, date, count: monthchar.find(item => item.day === day)?.count || 0 };
    });

    const { startOfWeek, endOfWeek } = this.getStartAndEndDateOfWeek(new Date());

    const weekchar = await this.requestModel.aggregate(
      [
        {
          $match: {
            createdAt: { $gte: startOfWeek, $lte: endOfWeek }
          }
        },
        { $group: { _id: { $dayOfWeek: '$createdAt' }, count: { $sum: 1 } } },
        { $addFields: { day: '$_id' } },
        { $project: { _id: 0, day: 1, count: 1 } },
        { $sort: { day: 1 } }
      ],
      { allowDiskUse: true }
    );

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
      devices
    };
  }

  async inspector(): Promise<Record<string, any>> {
    const dayNow = new Date();
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const daysAgo = (days: number) => new Date(dayNow.getTime() - days * MS_PER_DAY);

    const expectedDays = [365, 180, 90, 60, 30, 15, 7, 1];

    const [count, rawData] = await Promise.all([
      this.inspectorModel.countDocuments(),
      this.inspectorModel
        .aggregate([
          {
            $bucket: {
              groupBy: '$updatedAt',
              boundaries: [
                daysAgo(364),
                daysAgo(180),
                daysAgo(90),
                daysAgo(60),
                daysAgo(30),
                daysAgo(15),
                daysAgo(7),
                daysAgo(1),
                dayNow
              ],
              default: daysAgo(365),
              output: { count: { $sum: 1 } }
            }
          },
          {
            $project: {
              _id: 0,
              count: 1,
              days: { $round: [{ $divide: [{ $subtract: [dayNow, '$_id'] }, MS_PER_DAY] }, 0] }
            }
          },
          { $sort: { days: 1 } }
        ])
        .allowDiskUse(true)
    ]);

    const dataMap = new Map(rawData.map(item => [Math.round(Number(item.days)), item.count]));

    const inspectorByDays = expectedDays.map(days => ({
      days: days,
      count: dataMap.get(days) || 0
    }));

    return { count, inspectorByDays };
  }

  async dashboard(): Promise<Record<string, any>> {
    const currentDate = new Date();

    const firstDayOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    const { startOfWeek, endOfWeek } = this.getStartAndEndDateOfWeek(currentDate);

    const [
      users,
      ipaddress,
      mailboxes,
      requests,
      inspectors,
      organizations,
      subdivisions,
      departments,
      positions,
      locations,
      devices,
      activityAPI,
      activityUsers
    ] = await Promise.all([
      this.userModel.countDocuments(),
      this.ipaddressModel.countDocuments(),
      this.mailboxModel.countDocuments(),
      this.requestModel.countDocuments(),
      this.inspectorModel.countDocuments(),
      this.organizationModel.countDocuments(),
      this.subdivisionModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.positionModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.deviceModel.countDocuments(),
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
              $gte: startOfWeek,
              $lte: endOfWeek
            },
            user: {
              $nin: ['anonymous', 'system', null]
            }
          }
        },
        {
          $group: { _id: '$user', count: { $sum: 1 } }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $sort: { count: -1 }
        },
        {
          $project: {
            _id: 0,
            user: '$user.fullname',
            count: 1
          }
        }
      ])
    ]);

    return {
      users,
      ipaddress,
      mailboxes,
      requests,
      inspectors,
      organizations,
      subdivisions,
      departments,
      positions,
      locations,
      devices,
      activityAPI,
      activityUsers
    };
  }
}
