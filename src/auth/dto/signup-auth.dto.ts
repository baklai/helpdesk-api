import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsNotEmpty, IsDefined, IsString, IsEmail } from 'class-validator';

export class SignupAuthDto {
  @ApiProperty({ description: 'The full name of the profile', example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'The email of the profile', example: 'john@helpdesk.io' })
  @IsEmail()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the profile', example: '+38(123)456-78-90' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;
}
