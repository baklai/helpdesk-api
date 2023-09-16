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

  @ApiProperty({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/12/2023'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  reqnum: string;

  @ApiProperty({ description: 'Email login', example: 'john.doe1985' })
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
  @IsOptional()
  dateClose?: Date;

  @ApiPropertyOptional({ description: 'Comment about email', example: 'Email comment' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ipaddress?: string;

  @ApiProperty({
    type: LocationDto,
    description: 'ID of the associated location',
    example: 'Location ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly location?: LocationDto;

  @ApiProperty({
    type: CompanyDto,
    description: 'ID of the associated company',
    example: 'Company ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly company: CompanyDto;

  @ApiProperty({
    type: BranchDto,
    description: 'ID of the associated branch',
    example: 'Branch ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly branch: BranchDto;

  @ApiProperty({
    type: EnterpriseDto,
    description: 'ID of the associated enterprise',
    example: 'Enterprise ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly enterprise: EnterpriseDto;

  @ApiProperty({
    type: DepartmentDto,
    description: 'ID of the associated department',
    example: 'Department ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly department: DepartmentDto;

  @ApiProperty({
    type: PositionDto,
    description: 'ID of the associated position',
    example: 'Position ID'
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
