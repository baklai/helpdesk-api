import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Mailbox, MailboxSchema } from './schemas/mailbox.schema';
import { MailboxesController } from './mailboxes.controller';
import { MailboxesService } from './mailboxes.service';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mailbox.name, schema: MailboxSchema }])],
  controllers: [MailboxesController],
  providers: [MailboxesService]
})
export class MailboxesModule {}
