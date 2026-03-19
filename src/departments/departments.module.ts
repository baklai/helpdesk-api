import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { RequestSchema } from 'src/requests/models/request.schema';

import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { Department, DepartmentSchema } from './models/department.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema }
    ])
  ],
  providers: [DepartmentsResolver, DepartmentsService],
  exports: [DepartmentsService]
})
export class DepartmentsModule {}
