import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    description: 'The name of the position (must be unique)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  readonly name: string;
}
