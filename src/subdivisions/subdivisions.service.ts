import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { RequestDocument } from 'src/requests/models/request.schema';

import { CreateSubdivisionInput } from './dto/create-subdivision.input';
import { UpdateSubdivisionInput } from './dto/update-subdivision.input';
import { SubdivisionEntity } from './entities/subdivision.entity';
import { Subdivision, SubdivisionDocument } from './models/subdivision.schema';

@Injectable()
export class SubdivisionsService extends BaseCrudService<
  SubdivisionDocument,
  SubdivisionEntity,
  CreateSubdivisionInput,
  UpdateSubdivisionInput
> {
  constructor(
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<SubdivisionDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>
  ) {
    super(subdivisionModel);
  }

  override async removeOneById(id: string): Promise<SubdivisionEntity> {
    const result = await super.removeOneById(id);

    await this.ipaddressModel.updateMany(
      { subdivision: result.id },
      { $set: { subdivision: null } }
    );
    await this.mailboxModel.updateMany({ subdivision: result.id }, { $set: { subdivision: null } });
    await this.requestModel.updateMany({ subdivision: result.id }, { $set: { subdivision: null } });

    return result;
  }
}
