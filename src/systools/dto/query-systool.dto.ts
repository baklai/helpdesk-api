import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIP, IsNotEmpty, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({ description: 'The input IP address', example: '127.0.0.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly host: string;
}
