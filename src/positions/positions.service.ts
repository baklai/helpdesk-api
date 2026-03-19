import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { RequestDocument } from 'src/requests/models/request.schema';

import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { PositionEntity } from './entities/position.entity';
import { Position, PositionDocument } from './models/position.schema';

@Injectable()
export class PositionsService extends BaseCrudService<
  PositionDocument,
  PositionEntity,
  CreatePositionInput,
  UpdatePositionInput
> {
  constructor(
    @InjectModel(Position.name) private readonly positionModel: Model<PositionDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>
  ) {
    super(positionModel);
  }

  async removeOneById(id: string): Promise<PositionEntity> {
    const result = await super.removeOneById(id);

    await this.ipaddressModel.updateMany({ position: result.id }, { $set: { position: null } });
    await this.mailboxModel.updateMany({ position: result.id }, { $set: { position: null } });
    await this.requestModel.updateMany({ position: result.id }, { $set: { position: null } });

    return result;
  }
}
