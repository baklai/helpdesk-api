import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { RequestDocument } from 'src/requests/models/request.schema';

import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { DeviceEntity } from './entities/device.entity';
import { Device, DeviceDocument } from './models/device.schema';

@Injectable()
export class DevicesService extends BaseCrudService<
  DeviceDocument,
  DeviceEntity,
  CreateDeviceInput,
  UpdateDeviceInput
> {
  constructor(
    @InjectModel(Device.name) private readonly deviceModel: Model<DeviceDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>
  ) {
    super(deviceModel);
  }

  override async removeOneById(id: string): Promise<DeviceEntity> {
    const result = await super.removeOneById(id);

    await this.ipaddressModel.updateMany({ device: result.id }, { $set: { device: null } });
    await this.mailboxModel.updateMany({ device: result.id }, { $set: { device: null } });
    await this.requestModel.updateMany({ device: result.id }, { $set: { device: null } });

    return result;
  }
}
