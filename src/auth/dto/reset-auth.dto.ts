import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetAuthDto {
  @ApiProperty({ description: 'The email of the profile', example: 'helpdesk@helpdesk.com' })
  @IsEmail()
  @IsString()
  @IsDefined({ message: 'Email must be defined' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  readonly email: string;
}
