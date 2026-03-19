import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Channel, ChannelSchema } from 'src/channels/models/channel.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/models/request.schema';
import { UsersModule } from 'src/users/users.module';

import { Report, ReportSchema } from './models/report.schema';
import { ReportsResolver } from './reports.resolver';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Channel.name, schema: ChannelSchema }
    ]),
    UsersModule
  ],
  providers: [ReportsResolver, ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
