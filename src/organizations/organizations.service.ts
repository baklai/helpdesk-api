import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { RequestDocument } from 'src/requests/models/request.schema';
import { Subdivision, SubdivisionDocument } from 'src/subdivisions/models/subdivision.schema';

import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { OrganizationEntity } from './entities/organization.entity';
import { Organization, OrganizationDocument } from './models/organization.schema';

@Injectable()
export class OrganizationsService extends BaseCrudService<
  OrganizationDocument,
  OrganizationEntity,
  CreateOrganizationInput,
  UpdateOrganizationInput
> {
  constructor(
    @InjectModel(Organization.name) private readonly organizationModel: Model<OrganizationDocument>,
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<SubdivisionDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>
  ) {
    super(organizationModel);
  }

  override async removeOneById(id: string): Promise<OrganizationEntity> {
    const result = await super.removeOneById(id);

    await this.subdivisionModel.deleteMany({ organization: result.id });

    await this.ipaddressModel.updateMany(
      { organization: result.id },
      { $set: { organization: null, subdivision: null } }
    );
    await this.mailboxModel.updateMany(
      { organization: result.id },
      { $set: { organization: null, subdivision: null } }
    );
    await this.requestModel.updateMany(
      { organization: result.id },
      { $set: { organization: null, subdivision: null } }
    );

    return result;
  }
}
