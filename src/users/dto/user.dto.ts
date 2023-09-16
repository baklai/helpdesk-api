import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  MinLength
} from 'class-validator';

import { Scope } from 'src/common/enums/scope.enum';

export class UserDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'The login of the user', example: 'JohnDoe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({ description: 'The full name of the user', example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
  @IsEmail()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the user', example: '+38(234)567-89-10' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @ApiPropertyOptional({
    description: 'Flag indicating if the user is active',
    default: false,
    example: true
  })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly isActive: boolean;

  @ApiPropertyOptional({
    description: 'Flag indicating if the user is an admin',
    default: false,
    example: false
  })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly isAdmin: boolean;

  @ApiPropertyOptional({
    description: "The user's scope",
    default: [],
    example: [
      Scope.EventRead,
      Scope.ChannelRead,
      Scope.IpaddressRead,
      Scope.RequestRead,
      Scope.InspectorRead,
      Scope.BranchRead,
      Scope.ChannelRead,
      Scope.CompanyRead,
      Scope.DepartmentRead,
      Scope.EnterpriseRead,
      Scope.PositionRead,
      Scope.UnitRead,
      Scope.StatisticNetworkRead,
      Scope.StatisticRequestRead,
      Scope.StatisticInspectorRead
    ]
  })
  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly scope: Scope;

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
