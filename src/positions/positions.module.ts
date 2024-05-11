import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/schemas/request.schema';

import { Position, PositionSchema } from './schemas/position.schema';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Ipaddress.name, schema: IpaddressSchema }
    ])
  ],
  controllers: [PositionsController],
  providers: [PositionsService]
})
export class PositionsModule {}
