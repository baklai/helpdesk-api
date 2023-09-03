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

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';
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
    description: 'Mail number',
    example: 'Letter number №548925 from 12/12/2023'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({ description: 'Date when internet was opened', example: new Date() })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when internet was closed', example: new Date() })
  @IsDate()
  @IsOptional()
  dateClose?: Date;

  @ApiPropertyOptional({ description: 'Comment about internet', example: 'Internet comment' })
  @IsString()
  @IsOptional()
  comment?: string;
}

class EmailDto {
  @ApiProperty({ description: 'Email address', example: 'sample@mail.com' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({ description: 'Email login', example: 'login123' })
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
}

export class IpaddressDto extends MongoSchemaDto {
  @ApiProperty({ description: 'IP address', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ipaddress: string;

  @ApiPropertyOptional({ description: 'IP index', example: 1 })
  @IsNumber()
  @IsOptional()
  indexip?: number;

  @ApiProperty({ type: CIDRDto, description: 'CIDR information' })
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  cidr: CIDRDto;

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

  @ApiPropertyOptional({ description: 'Autoanswer text', example: 'Autoanswer text' })
  @IsString()
  @IsOptional()
  autoanswer?: string;

  @ApiPropertyOptional({ description: 'Email address', example: 'sample@mail.com' })
  @IsString()
  @IsOptional()
  mail?: string;

  @ApiPropertyOptional({ description: 'Date', example: new Date() })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({ description: 'Full name', example: 'Full name' })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '123-456-7890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Comment text', example: 'Comment text' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({ type: InternetDto, description: 'Internet information' })
  @IsOptional()
  @ValidateNested()
  internet?: InternetDto;

  @ApiPropertyOptional({ type: [EmailDto], description: 'List of email addresses' })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  email?: EmailDto[];
}
