import { OmitType } from '@nestjs/swagger';

import { MailboxDto } from './mailbox.dto';

export class CreateMailboxDto extends OmitType(MailboxDto, ['id', 'createdAt', 'updatedAt']) {}
