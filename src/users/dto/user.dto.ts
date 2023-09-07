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
  @IsDefined({ message: 'Login must be defined' })
  @IsNotEmpty({ message: 'Login must not be empty' })
  readonly login: string;

  @ApiProperty({
    description: 'The password of the user (minimum 6 characters)',
    example: 'vJaPk2eg9UaN'
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsDefined({ message: 'Password must be defined' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  readonly password: string;

  @ApiProperty({ description: 'The full name of the user', example: 'John Doe' })
  @IsString()
  @IsDefined({ message: 'Full name must be defined' })
  @IsNotEmpty({ message: 'Full name not be empty' })
  readonly fullname: string;

  @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
  @IsEmail()
  @IsString()
  @IsDefined({ message: 'Email must be defined' })
  @IsNotEmpty({ message: 'Email not be empty' })
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the user', example: '+38(234)567-89-10' })
  @IsString()
  @IsDefined({ message: 'Phone number must be defined' })
  @IsNotEmpty({ message: 'Phone number not be empty' })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'The timeout value for the user', example: 15 })
  @Min(5)
  @Max(90)
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly timeout?: number;

  @ApiPropertyOptional({ description: 'Flag indicating if the user is active', example: true })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly isActive?: boolean;

  @ApiPropertyOptional({ description: 'Flag indicating if the user is an admin', example: false })
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly isAdmin?: boolean;

  @ApiPropertyOptional({
    description: "The user's scope",
    example: [
      Scope.BranchRead,
      Scope.ChannelRead,
      Scope.CompanyRead,
      Scope.DepartmentRead,
      Scope.EnterpriseRead,
      Scope.EventRead,
      Scope.InspectorRead,
      Scope.IpaddressRead,
      Scope.LoggerRead,
      Scope.NoticeRead,
      Scope.PositionRead,
      Scope.RequestRead,
      Scope.FilterRead,
      Scope.UnitRead,
      Scope.UserRead,
      Scope.StatisticNetworkRead,
      Scope.StatisticRequestRead,
      Scope.StatisticInspectorRead,
      Scope.StatisticDashboardRead
    ]
  })
  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly scope?: Scope;

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
