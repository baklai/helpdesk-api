import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
export class CreateOnmapDto {
  @ApiProperty({
    description: 'Назва скану',
    example: 'Тестове сканування 127.0.0.1'
  })
  @IsString()
  readonly title: string;
  @ApiProperty({
    description: 'Мета сканування',
    example: '127.0.0.1'
  })
  @IsString()
  readonly target: string;
  @ApiProperty({
    description: 'Назва сканування профілю',
    example: 'Ping scan'
  })
  @IsString()
  readonly profile: string;
  @ApiProperty({
    description: 'Прапори сканування',
    example: ['-sn', '-P4']
  })
  @IsArray()
  readonly flags: string[];
}
