import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIP,
  IsDate,
  IsString,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
  IsOptional
} from 'class-validator';

import { CIDRDto } from './cidr.dto';
import { InternetDto } from './internet.dto';

export class CreateIpaddressDto {
  @ApiProperty({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly ipaddress: string;

  @ApiProperty({ description: 'CIDR Information', example: CIDRDto })
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  readonly cidr: CIDRDto;

  @ApiProperty({ description: 'Incoming request number', example: '№1234/56' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly reqnum: string;

  @ApiProperty({ description: 'Date of create record', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({ description: 'Client full name', example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'Client phone number', example: '1234-56-78' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'Comment text', example: 'Network access limited' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({
    description: 'Internet information',
    example: InternetDto
  })
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @IsOptional()
  readonly internet: InternetDto;

  @ApiPropertyOptional({ description: 'Autoanswer', example: '(12 3456 7)89' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly autoanswer: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Unit',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly unit: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Location',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Company',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly company: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Branch',
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly branch: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Enterprise',
    example: '6299b5cebf44864bfcea372a'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly enterprise: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Department',
    example: '6299b5cebf44864bfcea3772'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly department: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Position',
    example: '6299b5cebf44864bfcea391a'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly position: string;
}
