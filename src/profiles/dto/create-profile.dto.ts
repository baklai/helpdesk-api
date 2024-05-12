import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength
} from 'class-validator';

import { Scope } from 'src/common/enums/scope.enum';

export class CreateProfileDto {
  @ApiProperty({ description: 'The email of the profile', example: 'john@example.com' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the profile (minimum 6 characters)',
    example: 'vJaPk2eg9UaN'
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  readonly password: string;

  @ApiProperty({ description: 'The full name of the profile', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'The phone number of the profile', example: '+38(234)567-89-10' })
  @IsString()
  @IsPhoneNumber()
  readonly phone: string;

  @ApiPropertyOptional({
    description: 'Flag indicating if the profile is active',
    default: false,
    example: true
  })
  @IsBoolean()
  @IsOptional()
  readonly isActivated: boolean;

  @ApiPropertyOptional({
    description: 'Flag indicating if the profile is an admin',
    default: false,
    example: false
  })
  @IsBoolean()
  @IsOptional()
  readonly isAdmin: boolean;

  @ApiPropertyOptional({
    description: "The profile's scope",
    default: [],
    example: [
      Scope.EventRead,
      Scope.ChannelRead,
      Scope.IpaddressRead,
      Scope.RequestRead,
      Scope.InspectorRead,
      Scope.OrganizationRead,
      Scope.SubdivisionRead,
      Scope.DepartmentRead,
      Scope.PositionRead,
      Scope.LocationRead,
      Scope.UnitRead,
      Scope.FilterRead,
      Scope.StatisticNetworkRead,
      Scope.StatisticRequestRead,
      Scope.StatisticInspectorRead
    ]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly scope: Scope;
}
