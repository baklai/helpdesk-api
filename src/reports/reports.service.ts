import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';

import { Channel, ChannelDocument } from 'src/channels/models/channel.schema';
import type { JwtPayload } from 'src/common/types/jwt-payload.type';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestDocument } from 'src/requests/models/request.schema';

import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { ReportEntity } from './entities/report.entity';
import { Report, ReportDocument } from './models/report.schema';

const COLLECTION_CONFIG: Record<
  string,
  {
    model: string;
    populate: string[];
  }
> = {
  ipaddresses: {
    model: 'ipaddress',
    populate: ['device', 'location', 'organization', 'subdivision', 'department', 'position']
  },
  mailboxes: {
    model: 'mailbox',
    populate: ['organization', 'subdivision', 'department', 'position']
  },
  requests: {
    model: 'request',
    populate: [
      'opened',
      'closed',
      'position',
      'location',
      'organization',
      'subdivision',
      'department'
    ]
  },
  channels: {
    model: 'channel',
    populate: []
  }
};

@Injectable()
export class ReportsService {
  private readonly models: Record<string, Model<any>>;

  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>,
    @InjectModel(Channel.name) private readonly channelModel: Model<ChannelDocument>
  ) {
    this.models = {
      ipaddresses: this.ipaddressModel,
      mailboxes: this.mailboxModel,
      requests: this.requestModel,
      channels: this.channelModel
    };
  }

  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? '✅' : '🚫';
    if (value instanceof Date) return value.toLocaleDateString('uk-UA');
    if (typeof value === 'object' && !Array.isArray(value)) {
      return value?.name ?? value?.email ?? value?.fullname ?? String(value);
    }
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  }

  private mapDocumentFields(
    item: Record<string, any>,
    fields: Record<string, string>
  ): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [dbField, label] of Object.entries(fields)) {
      const value = this.getNestedValue(item, dbField);
      result[label] = this.formatValue(value);
    }
    return result;
  }

  async create(user: JwtPayload, input: CreateReportInput): Promise<ReportEntity> {
    if (input.datacollection && !COLLECTION_CONFIG[input.datacollection]) {
      throw new BadRequestException(
        `Колекція "${input.datacollection}" не підтримується. Доступні: ${Object.keys(COLLECTION_CONFIG).join(', ')}`
      );
    }

    try {
      const result = await this.reportModel.create({ ...input, creator: user.id });
      return result as unknown as ReportEntity;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Звіт із такою назвою вже існує');
      }
      throw new UnprocessableEntityException(error.message as string);
    }
  }

  async findAll(): Promise<ReportEntity[]> {
    const result = await this.reportModel.find().sort({ updatedAt: -1 }).exec();

    return result as unknown as ReportEntity[];
  }

  async findOneById(id: string): Promise<ReportEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор звіту');
    }
    const result = await this.reportModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException('Звіт не знайдено');
    }
    return result as unknown as ReportEntity;
  }

  async updateOneById(
    user: JwtPayload,
    id: string,
    input: UpdateReportInput
  ): Promise<ReportEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор звіту');
    }

    if (input.datacollection && !COLLECTION_CONFIG[input.datacollection]) {
      throw new BadRequestException(
        `Колекція "${input.datacollection}" не підтримується. Доступні: ${Object.keys(COLLECTION_CONFIG).join(', ')}`
      );
    }

    try {
      const updated = await this.reportModel
        .findByIdAndUpdate(
          id,
          { $set: { ...input, creator: user.id } },
          { returnDocument: 'after' }
        )
        .exec();

      if (!updated) {
        throw new NotFoundException('Звіт не знайдено');
      }
      return updated as unknown as ReportEntity;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Запис із такою назвою вже існує');
      }
      throw new UnprocessableEntityException(error.message as string);
    }
  }

  async removeOneById(id: string): Promise<ReportEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор звіту');
    }
    const deleted = await this.reportModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Звіт не знайдено');
    }
    return deleted as unknown as ReportEntity;
  }

  async executeById(id: string): Promise<Record<string, any>[]> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор звіту');
    }

    const report = await this.reportModel.findById(id).exec();
    if (!report) {
      throw new NotFoundException('Звіт не знайдено');
    }

    const { datacollection, fields, sorts, filters } = report;

    const config = COLLECTION_CONFIG[datacollection];
    if (!config) {
      throw new NotFoundException(
        `Колекцію "${datacollection}" не підтримується. Доступні: ${Object.keys(COLLECTION_CONFIG).join(', ')}`
      );
    }

    const model = this.models[datacollection];

    const sortQuery: Record<string, SortOrder> =
      sorts && Object.keys(sorts).length ? (sorts as Record<string, SortOrder>) : { createdAt: -1 };
    const filterQuery = filters ?? {};
    const fieldMap = fields ?? {};

    let query = model.find(filterQuery).sort(sortQuery);

    if (config.populate.length) {
      const requestedFields = Object.keys(fieldMap);
      const populateFields = config.populate.filter(rel =>
        requestedFields.some(f => f === rel || f.startsWith(`${rel}.`))
      );
      for (const rel of populateFields) {
        query = query.populate(rel);
      }
    }

    const docs = await query.exec();

    return docs.map((doc, index) => {
      const plain = doc.toObject ? doc.toObject({ virtuals: true }) : doc;
      return {
        '№': index + 1,
        ...this.mapDocumentFields(plain, fieldMap)
      };
    });
  }

  getAvailableCollections(): { name: string; label: string; fields: string[] }[] {
    return [
      {
        name: 'ipaddresses',
        label: 'IP-адреси',
        fields: [
          'ipaddress',
          'mask',
          'gateway',
          'reqnum',
          'fullname',
          'phone',
          'email',
          'inventory',
          'autoanswer',
          'comment',
          'internet.status',
          'internet.reqnum',
          'internet.comment',
          'device.name',
          'location.name',
          'location.region',
          'organization.name',
          'subdivision.name',
          'department.name',
          'position.name',
          'createdAt',
          'updatedAt'
        ]
      },
      {
        name: 'mailboxes',
        label: 'Поштові скриньки',
        fields: [
          'reqnum',
          'email',
          'fullname',
          'phone',
          'status',
          'comment',
          'organization.name',
          'subdivision.name',
          'department.name',
          'position.name',
          'createdAt',
          'updatedAt'
        ]
      },
      {
        name: 'requests',
        label: 'Заявки',
        fields: [
          'fullname',
          'phone',
          'ipaddress',
          'reqnum',
          'request',
          'comment',
          'conclusion',
          'status',
          'opened.fullname',
          'closed.fullname',
          'position.name',
          'location.name',
          'location.region',
          'organization.name',
          'subdivision.name',
          'department.name',
          'createdAt',
          'updatedAt'
        ]
      },
      {
        name: 'channels',
        label: 'Мережеві канали',
        fields: [
          'locationFrom',
          'deviceFrom',
          'locationTo',
          'deviceTo',
          'level',
          'channelType',
          'speed',
          'status',
          'operator',
          'composition',
          'createdAt',
          'updatedAt'
        ]
      }
    ];
  }
}
