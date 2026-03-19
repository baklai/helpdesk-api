import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestDocument } from 'src/requests/models/request.schema';

import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { LocationEntity } from './entities/location.entity';
import { Location, LocationDocument } from './models/location.schema';

@Injectable()
export class LocationsService extends BaseCrudService<
  LocationDocument,
  LocationEntity,
  CreateLocationInput,
  UpdateLocationInput
> {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>
  ) {
    super(locationModel);
  }

  override async removeOneById(id: string): Promise<LocationEntity> {
    const result = await super.removeOneById(id);

    await this.ipaddressModel.updateMany({ location: result.id }, { $set: { location: null } });
    await this.mailboxModel.updateMany({ location: result.id }, { $set: { location: null } });
    await this.requestModel.updateMany({ location: result.id }, { $set: { location: null } });

    return result;
  }
}
