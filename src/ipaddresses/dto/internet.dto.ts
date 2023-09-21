import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InternetDto {
  @ApiPropertyOptional({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/07/2023'
  })
  @IsString()
  @IsOptional()
  reqnum: string;

  @ApiPropertyOptional({ description: 'Date when internet was opened', example: new Date() })
  @IsDate()
  @IsOptional()
  dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when internet was closed', example: new Date() })
  @IsDate()
  @IsOptional()
  dateClose: Date;

  @ApiPropertyOptional({
    description: 'Comment about internet',
    example: 'Internet is closed of №1234/560'
  })
  @IsString()
  @IsOptional()
  comment: string;
}
