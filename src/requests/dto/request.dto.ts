import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsIP,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { UserDto } from 'src/users/dto/user.dto';
import { LocationDto } from 'src/locations/dto/location.dto';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { BranchDto } from 'src/branches/dto/branch.dto';
import { EnterpriseDto } from 'src/enterprises/dto/enterprise.dto';
import { DepartmentDto } from 'src/departments/dto/department.dto';
import { PositionDto } from 'src/positions/dto/position.dto';

export class RequestDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'Full name of the requester', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '12-34-567' })
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP Address of the requester', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsOptional()
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Incoming request number of the requester',
    example: '№125987/01'
  })
  @IsString()
  @IsOptional()
  readonly reqnum: string;

  @ApiProperty({ description: 'Request message', example: 'Please fix the issue' })
  @IsString()
  readonly request: string;

  @ApiPropertyOptional({ description: 'Comment about the request', example: 'Fixed the issue' })
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Conclusion about the request', example: 'Issue resolved' })
  @IsString()
  @IsOptional()
  readonly conclusion: string;

  @ApiProperty({
    description: 'Document of the associated User',
    example: UserDto
  })
  @IsString()
  @IsMongoId()
  readonly workerOpen: UserDto;

  @ApiPropertyOptional({
    description: 'Document of the associated User',
    example: UserDto
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly workerClose: UserDto;

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
