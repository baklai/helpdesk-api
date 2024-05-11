import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Request, RequestSchema } from 'src/requests/schemas/request.schema';

import { Department, DepartmentSchema } from './schemas/department.schema';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Ipaddress.name, schema: IpaddressSchema }
    ])
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
