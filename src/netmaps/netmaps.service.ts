import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';

import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';

@Injectable()
export class NetmapsService {
  constructor(@InjectModel(Ipaddress.name) private readonly ipaddressModel: Record<string, any>) {}

  async networkMap(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid location ID');
    }

    const records = await this.ipaddressModel
      .find({ location: new mongoose.Types.ObjectId(id) }, null, {
        autopopulate: true
      })
      .limit(255);

    return records.map((record: Record<string, any>) => {
      return {
        id: record.id,
        unit: record.unit.name,
        ipaddress: record.ipaddress,
        gateway: record.gateway
      };
    });
  }
}
