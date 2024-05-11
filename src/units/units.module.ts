import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/schemas/request.schema';

import { Unit, UnitSchema } from './schemas/unit.schema';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Unit.name, schema: UnitSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Ipaddress.name, schema: IpaddressSchema }
    ])
  ],
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule {}
