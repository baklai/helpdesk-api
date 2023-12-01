import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({
    description: 'The type of option',
    example: 'TASK_CLEAR_LOGS'
  })
  @IsString()
  readonly type: string;
}
