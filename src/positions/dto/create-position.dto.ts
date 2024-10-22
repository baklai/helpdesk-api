import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    description: 'Назва посади (має бути унікальною)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  readonly name: string;
}
