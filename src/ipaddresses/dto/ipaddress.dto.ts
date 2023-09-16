import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsMongoId,
  IsIP,
  IsDefined
} from 'class-validator';

import { BranchDto } from 'src/branches/dto/branch.dto';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { DepartmentDto } from 'src/departments/dto/department.dto';
import { EnterpriseDto } from 'src/enterprises/dto/enterprise.dto';
import { LocationDto } from 'src/locations/dto/location.dto';
import { PositionDto } from 'src/positions/dto/position.dto';

class CIDRDto {
  @ApiProperty({ description: 'CIDR value', example: 24 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ description: 'CIDR mask', example: '255.255.255.0' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mask: string;
}

class InternetDto {
  @ApiProperty({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/12/2023'
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
  @IsOptional()
  dateClose?: Date;

  @ApiPropertyOptional({
    description: 'Comment about internet',
    example: 'Internet is closed of №1234/560'
  })
  @IsString()
  @IsOptional()
  comment?: string;
}

export class IpaddressDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly ipaddress: string;

  @ApiProperty({ description: 'Index IP Address', example: 3232235521 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly indexip: number;

  @ApiProperty({
    type: CIDRDto,
    description: 'CIDR Information',
    example: { value: 24, mask: '255.255.255.0' }
  })
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  readonly cidr: CIDRDto;

  @ApiProperty({ description: 'Incoming request number', example: '№1234/56' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly reqnum: string;

  @ApiProperty({ description: 'Date of create', example: new Date() })
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

  @ApiPropertyOptional({ description: 'Autoanswer', example: '(12 3456 7)89' })
  @IsString()
  @IsOptional()
  readonly autoanswer?: string;

  @ApiPropertyOptional({
    type: InternetDto,
    description: 'Internet information',
    example: InternetDto
  })
  @IsOptional()
  @ValidateNested()
  readonly internet?: InternetDto;

  @ApiPropertyOptional({ description: 'Comment text', example: 'Comment text' })
  @IsString()
  @IsOptional()
  readonly comment?: string;

  @ApiProperty({
    type: LocationDto,
    description: 'ID of the associated location',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly location?: LocationDto;

  @ApiProperty({
    type: CompanyDto,
    description: 'ID of the associated company',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly company: CompanyDto;

  @ApiProperty({
    type: BranchDto,
    description: 'ID of the associated branch',
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly branch: BranchDto;

  @ApiProperty({
    type: EnterpriseDto,
    description: 'ID of the associated enterprise',
    example: '6299b5cebf44864bfcea372a'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly enterprise: EnterpriseDto;

  @ApiProperty({
    type: DepartmentDto,
    description: 'ID of the associated department',
    example: '6299b5cebf44864bfcea3772'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly department: DepartmentDto;

  @ApiProperty({
    type: PositionDto,
    description: 'ID of the associated position',
    example: '6299b5cebf44864bfcea391a'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly position: PositionDto;

  @ApiProperty({
    description: 'The created date of the record',
    example: '2021-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty({
    description: 'The updated date of the record',
    example: '2022-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  readonly updatedAt: Date;
}
