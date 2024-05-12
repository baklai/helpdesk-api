import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninAuthDto {
  @ApiProperty({ description: 'The email of the profile', example: 'helpdesk@helpdesk.com' })
  @IsEmail()
  @IsString()
  @IsDefined({ message: 'Email must be defined' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  readonly email: string;

  @ApiProperty({
    description: 'The password of the profile (minimum 6 characters)',
    example: 'helpdesk'
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsDefined({ message: 'Password must be defined' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  readonly password: string;
}
