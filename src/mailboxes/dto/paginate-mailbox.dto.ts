import { ApiProperty } from '@nestjs/swagger';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { MailboxDto } from './mailbox.dto';

export class PaginateMailboxDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [MailboxDto], description: 'Array of documents' })
  docs?: MailboxDto[];
}
