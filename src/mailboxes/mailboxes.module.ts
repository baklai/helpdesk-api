import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfilesModule } from 'src/profiles/profiles.module';

import { Mailbox, MailboxSchema } from './schemas/mailbox.schema';
import { MailboxesController } from './mailboxes.controller';
import { MailboxesService } from './mailboxes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mailbox.name, schema: MailboxSchema }]),
    ProfilesModule
  ],
  controllers: [MailboxesController],
  providers: [MailboxesService]
})
export class MailboxesModule {}
