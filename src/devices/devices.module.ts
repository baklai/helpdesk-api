import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/models/request.schema';

import { Device, DeviceSchema } from './models/device.schema';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Ipaddress.name, schema: IpaddressSchema }
    ])
  ],
  providers: [DevicesResolver, DevicesService],
  exports: [DevicesService]
})
export class DevicesModule {}
