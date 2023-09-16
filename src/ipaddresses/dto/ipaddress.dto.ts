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
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'Index IP Address', example: 3232235521 })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly indexip: number;

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
    description: 'Document of the associated Unit',
    example: UnitDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly unit: UnitDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Location',
    example: LocationDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly location: LocationDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Company',
    example: CompanyDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly company: CompanyDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Branch',
    example: BranchDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly branch: BranchDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Enterprise',
    example: EnterpriseDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly enterprise: EnterpriseDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Department',
    example: DepartmentDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly department: DepartmentDto;

  @ApiPropertyOptional({
    description: 'Document of the associated Position',
    example: PositionDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly position: PositionDto;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: new Date()
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: new Date()
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt: Date;
}
