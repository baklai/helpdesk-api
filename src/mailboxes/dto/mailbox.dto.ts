import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsOptional,
  IsNotEmpty,
  IsMongoId,
  IsIP,
  IsDefined
} from 'class-validator';

import { LocationDto } from 'src/locations/dto/location.dto';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { BranchDto } from 'src/branches/dto/branch.dto';
import { EnterpriseDto } from 'src/enterprises/dto/enterprise.dto';
import { DepartmentDto } from 'src/departments/dto/department.dto';
import { PositionDto } from 'src/positions/dto/position.dto';

export class MailboxDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/12/2023'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reqnum: string;

  @ApiProperty({ description: 'E-Mail login', example: 'john.doe1985' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'Fullname of email owner', example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ description: 'Date when email was opened', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when email was closed', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  dateClose: Date;

  @ApiPropertyOptional({
    description: 'Comment about email',
    example: 'This user has several mailboxes'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  comment: string;

  @ApiPropertyOptional({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  ipaddress: string;

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
