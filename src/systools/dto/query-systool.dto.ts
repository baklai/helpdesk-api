import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({ description: 'The input IP address', example: '127.0.0.1' })
  @IsIP()
  @IsString()
  readonly host: string;
}
