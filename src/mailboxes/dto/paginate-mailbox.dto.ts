import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { MailboxDto } from './mailbox.dto';

export class PaginateMailboxDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [MailboxDto], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: MailboxDto[];
}
