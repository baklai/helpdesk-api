import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { SyslogDto } from './syslog.dto';

export class PaginateSyslogDto extends PaginateV2ResponseDto {
  @ApiPropertyOptional({ type: [SyslogDto], description: 'Array of documents' })
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  docs: SyslogDto[];
}
