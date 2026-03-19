import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/models/request.schema';
import { Subdivision, SubdivisionSchema } from 'src/subdivisions/models/subdivision.schema';

import { Organization, OrganizationSchema } from './models/organization.schema';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Subdivision.name, schema: SubdivisionSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema }
    ])
  ],
  providers: [OrganizationsResolver, OrganizationsService],
  exports: [OrganizationsService]
})
export class OrganizationsModule {}
