import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Filter, FilterSchema } from 'src/filters/schemas/filter.schema';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Filter.name, schema: FilterSchema }
    ])
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
