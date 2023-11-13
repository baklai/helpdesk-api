import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateOnmapDto {
  @ApiProperty({
    description: 'The title of the scan',
    example: 'Test scan 127.0.0.1'
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'The target of the scan',
    example: '127.0.0.1'
  })
  @IsString()
  readonly target: string;

  @ApiProperty({
    description: 'The profile scan name',
    example: 'Ping scan'
  })
  @IsString()
  readonly profile: string;

  @ApiProperty({
    description: 'The scan flags',
    example: ['-sn', '-P4']
  })
  @IsArray()
  readonly flags: string[];
}
