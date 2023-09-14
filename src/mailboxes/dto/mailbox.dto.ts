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

import { BranchDto } from 'src/branches/dto/branch.dto';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { DepartmentDto } from 'src/departments/dto/department.dto';
import { EnterpriseDto } from 'src/enterprises/dto/enterprise.dto';
import { LocationDto } from 'src/locations/dto/location.dto';
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

  @ApiPropertyOptional({ description: 'IP address', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ipaddress?: string;

  @ApiPropertyOptional({
    type: LocationDto,
    description: 'ID of the associated location',
    example: 'Location ID'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  location?: LocationDto;

  @ApiPropertyOptional({
    type: CompanyDto,
    description: 'ID of the associated company',
    example: 'Company ID'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  company?: CompanyDto;

  @ApiPropertyOptional({
    type: BranchDto,
    description: 'ID of the associated branch',
    example: 'Branch ID'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  branch?: BranchDto;

  @ApiPropertyOptional({
    type: EnterpriseDto,
    description: 'ID of the associated enterprise',
    example: 'Enterprise ID'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  enterprise?: EnterpriseDto;

  @ApiPropertyOptional({
    type: DepartmentDto,
    description: 'ID of the associated department',
    example: 'Department ID'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  department?: DepartmentDto;

  @ApiPropertyOptional({
    type: PositionDto,
    description: 'ID of the associated position',
    example: 'Position ID'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  position?: PositionDto;

  @ApiPropertyOptional({ description: 'Fullname of email owner', example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '123-456-7890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Email number', example: '№12458' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({ description: 'Email login', example: 'login123' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'Date when email was opened', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when email was closed', example: new Date() })
  @IsDate()
  @IsOptional()
  dateClose?: Date;

  @ApiPropertyOptional({ description: 'Comment about email', example: 'Comment text' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: '2021-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: '2022-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt?: Date;
}
