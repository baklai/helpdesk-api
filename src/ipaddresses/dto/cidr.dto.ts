import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CIDRDto {
  @ApiProperty({ description: 'CIDR Value', example: 24 })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'CIDR Mask', example: '255.255.255.0' })
  @IsString()
  mask: string;
}
