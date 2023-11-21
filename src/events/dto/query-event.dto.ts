import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class QueryEventDto {
  @ApiProperty({
    description: 'Start date for filtering events',
    example: new Date(),
    required: true
  })
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({
    description: 'End date for filtering events',
    example: new Date(),
    required: true
  })
  @IsDate()
  readonly endDate: Date;
}
