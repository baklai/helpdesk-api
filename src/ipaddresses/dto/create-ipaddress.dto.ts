import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIP, IsDate, IsString, IsMongoId, ValidateNested, IsOptional } from 'class-validator';

import { CIDR, Internet } from '../schemas/ipaddress.schema';

export class CreateIpaddressDto {
  @ApiProperty({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  readonly ipaddress: string;

  @ApiProperty({ description: 'CIDR Information', example: CIDR })
  @ValidateNested()
  readonly cidr: CIDR;

  @ApiProperty({ description: 'Incoming request number', example: '№1234/56' })
  @IsString()
  readonly reqnum: string;

  @ApiProperty({ description: 'Date of create record', example: new Date() })
  @IsDate()
  readonly date: Date;

  @ApiProperty({ description: 'Client full name', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Client phone number', example: '1234-56-78' })
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'Comment text', example: 'Network access limited' })
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({
    description: 'Internet information',
    example: Internet
  })
  @IsOptional()
  readonly internet: Internet;

  @ApiPropertyOptional({ description: 'Autoanswer', example: '(12 3456 7)89' })
  @IsString()
  @IsOptional()
  readonly autoanswer: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Unit',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly unit: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Location',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Company',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly company: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Branch',
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly branch: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Enterprise',
    example: '6299b5cebf44864bfcea372a'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly enterprise: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Department',
    example: '6299b5cebf44864bfcea3772'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly department: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Position',
    example: '6299b5cebf44864bfcea391a'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly position: string;
}
