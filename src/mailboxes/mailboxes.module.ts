import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DepartmentsModule } from 'src/departments/departments.module';
import { NoticesModule } from 'src/notices/notices.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PositionsModule } from 'src/positions/positions.module';
import { SubdivisionsModule } from 'src/subdivisions/subdivisions.module';

import { MailboxesResolver } from './mailboxes.resolver';
import { MailboxesService } from './mailboxes.service';
import { Mailbox, MailboxSchema } from './models/mailbox.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mailbox.name, schema: MailboxSchema }]),
    NoticesModule,
    OrganizationsModule,
    SubdivisionsModule,
    DepartmentsModule,
    PositionsModule
  ],
  providers: [MailboxesResolver, MailboxesService],
  exports: [MailboxesService]
})
export class MailboxesModule {}
