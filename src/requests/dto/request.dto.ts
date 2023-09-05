import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsIP,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { UserDto } from 'src/users/dto/user.dto';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { BranchDto } from 'src/branches/dto/branch.dto';
import { DepartmentDto } from 'src/departments/dto/department.dto';
import { EnterpriseDto } from 'src/enterprises/dto/enterprise.dto';
import { LocationDto } from 'src/locations/dto/location.dto';
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
  fullname: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '12-34-567' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ description: 'IP address of the requester', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  ipaddress?: string;

  @ApiPropertyOptional({ description: 'Number of mail of the requester', example: 'Mail №125987' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  mail?: string;

  @ApiProperty({ description: 'Request message', example: 'Please fix the issue' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  request: string;

  @ApiPropertyOptional({
    description: 'Date when the request was closed',
    example: '2023-08-26T12:00:00Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  closed?: Date;

  @ApiPropertyOptional({ description: 'Comment about the request', example: 'Fixed the issue' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({ description: 'Conclusion about the request', example: 'Issue resolved' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  conclusion?: string;

  @ApiProperty({
    type: UserDto,
    description: 'ID of the associated position',
    example: 'User ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  workerOpen: UserDto;

  @ApiPropertyOptional({
    type: UserDto,
    description: 'ID of the associated position',
    example: 'User ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  workerClose?: UserDto;

  @ApiPropertyOptional({
    type: PositionDto,
    description: 'ID of the associated position',
    example: 'Position ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  position?: PositionDto;

  @ApiPropertyOptional({
    type: LocationDto,
    description: 'ID of the associated location',
    example: 'Location ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  location?: LocationDto;

  @ApiPropertyOptional({
    type: CompanyDto,
    description: 'ID of the associated company',
    example: 'Company ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  company?: CompanyDto;

  @ApiPropertyOptional({
    type: BranchDto,
    description: 'ID of the associated branch',
    example: 'Branch ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  branch?: BranchDto;

  @ApiPropertyOptional({
    type: EnterpriseDto,
    description: 'ID of the associated enterprise',
    example: 'Enterprise ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  enterprise?: EnterpriseDto;

  @ApiPropertyOptional({
    type: DepartmentDto,
    description: 'ID of the associated department',
    example: 'Department ID'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  department?: DepartmentDto;

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
