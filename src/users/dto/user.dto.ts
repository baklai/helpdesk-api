import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  Max,
  Min,
  MinLength
} from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class UserDto extends MongoSchemaDto {
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
  @IsDefined()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
  @IsEmail()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the user', example: '+1(234)567-89-10' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
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
    example: ['create', 'read', 'update', 'delete']
  })
  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly scope?: string[];
}
