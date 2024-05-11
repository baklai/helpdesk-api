import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/schemas/request.schema';

import { Subdivision, SubdivisionSchema } from './schemas/subdivision.schema';
import { SubdivisionsService } from './subdivisions.service';
import { SubdivisionsController } from './subdivisions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subdivision.name, schema: SubdivisionSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Ipaddress.name, schema: IpaddressSchema }
    ])
  ],
  controllers: [SubdivisionsController],
  providers: [SubdivisionsService]
})
export class SubdivisionsModule {}
