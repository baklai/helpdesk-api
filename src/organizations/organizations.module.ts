import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Subdivision, SubdivisionSchema } from 'src/subdivisions/schemas/subdivision.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/schemas/request.schema';

import { Organization, OrganizationSchema } from './schemas/organization.schema';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Subdivision.name, schema: SubdivisionSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Ipaddress.name, schema: IpaddressSchema }
    ])
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
