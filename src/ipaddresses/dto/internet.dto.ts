import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InternetDto {
  @ApiProperty({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/07/2023'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reqnum: string;

  @ApiProperty({ description: 'Date when internet was opened', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when internet was closed', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  dateClose: Date;

  @ApiPropertyOptional({
    description: 'Comment about internet',
    example: 'Internet is closed of №1234/560'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  comment: string;
}
