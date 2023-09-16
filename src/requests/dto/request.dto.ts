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
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'Full name of the requester', example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '12-34-567' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP Address of the requester', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Incoming request number of the requester',
    example: '№125987/01'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly reqnum: string;

  @ApiProperty({ description: 'Request message', example: 'Please fix the issue' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly request: string;

  @ApiPropertyOptional({
    description: 'Key the request was closed',
    default: false,
    example: true
  })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly closed: boolean;

  @ApiPropertyOptional({ description: 'Comment about the request', example: 'Fixed the issue' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Conclusion about the request', example: 'Issue resolved' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly conclusion: string;

  @ApiProperty({
    description: 'Document of the associated User',
    example: UserDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly workerOpen: UserDto;

  @ApiPropertyOptional({
    description: 'Document of the associated User',
    example: UserDto
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly workerClose: UserDto;

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
