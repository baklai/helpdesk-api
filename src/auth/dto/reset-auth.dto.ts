import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetAuthDto {
  @ApiProperty({ description: 'Електронна адреса профілю', example: 'helpdesk@helpdesk.com' })
  @IsEmail()
  @IsString()
  @IsDefined({ message: 'Необхідно вказати електронну адресу' })
  @IsNotEmpty({ message: 'Поле електронної пошти не повинно бути порожнім' })
  readonly email: string;
}
