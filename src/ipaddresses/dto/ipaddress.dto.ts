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

import { InternetDto } from './internet.dto';
import { CIDRDto } from './cidr.dto';

import { UnitDto } from 'src/units/dto/unit.dto';
import { LocationDto } from 'src/locations/dto/location.dto';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { BranchDto } from 'src/branches/dto/branch.dto';
import { EnterpriseDto } from 'src/enterprises/dto/enterprise.dto';
import { DepartmentDto } from 'src/departments/dto/department.dto';
import { PositionDto } from 'src/positions/dto/position.dto';

export class IpaddressDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'Index IP Address', example: 3232235521 })
  @IsNumber()
  readonly indexip: number;

  @ApiProperty({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  readonly ipaddress: string;

  @ApiProperty({ description: 'CIDR Information', example: CIDRDto })
  @ValidateNested()
  readonly cidr: CIDRDto;

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
    example: InternetDto
  })
  @ValidateNested()
  @IsOptional()
  readonly internet: InternetDto;

  @ApiPropertyOptional({ description: 'Autoanswer', example: '(12 3456 7)89' })
  @IsString()
  @IsOptional()
  readonly autoanswer: string;

  @ApiPropertyOptional({
    description: 'Document of the associated Unit',
    example: UnitDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly unit: UnitDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Location',
    example: LocationDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly location: LocationDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Company',
    example: CompanyDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly company: CompanyDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Branch',
    example: BranchDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly branch: BranchDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Enterprise',
    example: EnterpriseDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly enterprise: EnterpriseDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Department',
    example: DepartmentDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly department: DepartmentDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Position',
    example: PositionDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly position: PositionDto;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}
