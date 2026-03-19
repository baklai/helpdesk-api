import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/models/request.schema';

import { Position, PositionSchema } from './models/position.schema';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema }
    ])
  ],
  providers: [PositionsResolver, PositionsService],
  exports: [PositionsService]
})
export class PositionsModule {}
