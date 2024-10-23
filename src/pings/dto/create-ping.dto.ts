import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsString } from 'class-validator';

export class CreatePingDto {
  @ApiProperty({ description: 'Адреса хоста', example: '127.0.0.1' })
  @IsIP()
  @IsString()
  readonly host: string;
}
