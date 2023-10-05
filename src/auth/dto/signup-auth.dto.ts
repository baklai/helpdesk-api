import { ApiProperty } from '@nestjs/swagger';
import {
  IsPhoneNumber,
  IsNotEmpty,
  IsDefined,
  MinLength,
  IsString,
  IsEmail
} from 'class-validator';

export class SignupAuthDto {
  @ApiProperty({ description: 'The login of the user', example: 'helpdesk' })
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'The password of the user (minimum 6 characters)',
    example: 'helpdesk'
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  readonly password: string;

  @ApiProperty({ description: 'The full name of the user', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'The email of the user', example: 'john@helpdesk.io' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the user', example: '+38(123)456-78-90' })
  @IsString()
  @IsPhoneNumber()
  readonly phone: string;
}
