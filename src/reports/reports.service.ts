import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Filter } from 'src/filters/schemas/filter.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Filter.name) private readonly filterModel: Model<Filter>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>
  ) {}

  async getUnwantedSoftware() {
    const data = await this.filterModel.find({ type: 'software', status: 'deny' });
    return data.map((item, index) => {
      return {
        '№': (index + 1).toString(),
        'Unwanted software': item.regex,
        Description: item.description
      };
    });
  }

  async getInternetAccess() {
    const data = await this.ipaddressModel.find(
      {
        'internet.reqnum': { $ne: null },
        'internet.dateOpen': { $ne: null },
        'internet.dateClose': null
      },
      null,
      { autopopulate: true }
    );
    return data.map((item, index) => {
      return {
        '№': (index + 1).toString(),
        'IP Address': item?.ipaddress || '-',
        Location: item?.location?.name || '-',
        Organization: item?.organization?.name || '-',
        Subdivision: item?.subdivision?.name || '-',
        Department: item?.department?.name || '-',
        Fullname: item?.fullname || '-',
        Position: item?.position?.name || '-',
        Phone: item?.phone || '-',
        'Letter number': item?.internet?.reqnum || '-',
        'Date open': item?.internet?.dateOpen
          ? new Date(item.internet.dateOpen).toLocaleDateString()
          : '-'
      };
    });
  }

  async getUsersEmail() {
    const data = await this.mailboxModel.find({}, null, { autopopulate: true });
    return data.map((item, index) => {
      return {
        '№': (index + 1).toString(),
        Login: item?.login || '-',
        'Letter number': item?.reqnum || '-',
        'Date open': item?.dateOpen ? new Date(item.dateOpen).toLocaleDateString() : '-',
        'Date close': item?.dateClose ? new Date(item.dateClose).toLocaleDateString() : '-',
        Organization: item?.organization?.name || '-',
        Subdivision: item?.subdivision?.name || '-',
        Department: item?.department?.name || '-',
        Fullname: item?.fullname || '-',
        Position: item?.position?.name || '-',
        Phone: item?.phone || '-',
        Comment: item?.comment || '-'
      };
    });
  }
}
