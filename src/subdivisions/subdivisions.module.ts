import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/models/request.schema';

import { Subdivision, SubdivisionSchema } from './models/subdivision.schema';
import { SubdivisionsResolver } from './subdivisions.resolver';
import { SubdivisionsService } from './subdivisions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subdivision.name, schema: SubdivisionSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema }
    ])
  ],
  providers: [SubdivisionsResolver, SubdivisionsService],
  exports: [SubdivisionsService]
})
export class SubdivisionsModule {}
