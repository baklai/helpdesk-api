import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninAuthDto {
  @ApiProperty({ description: 'The login of the user', example: 'helpdesk' })
  @IsString()
  @IsDefined({ message: 'Login must be defined' })
  @IsNotEmpty({ message: 'Login must not be empty' })
  readonly login: string;

  @ApiProperty({
    description: 'The password of the user (minimum 6 characters)',
    example: 'helpdesk'
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsDefined({ message: 'Password must be defined' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  readonly password: string;
}
