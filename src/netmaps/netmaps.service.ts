import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';

@Injectable()
export class NetmapsService {
  constructor(@InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>) {}

  async networkMap() {
    return await this.ipaddressModel
      .find({ ipaddress: { $regex: '^10.7.110.', $options: 'i' } }, null, {
        autopopulate: true
      })
      .limit(100);
  }
}
