import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class QueryEventDto {
  @ApiProperty({
    description: 'Start date for filtering events',
    example: new Date(),
    required: true
  })
  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({
    description: 'End date for filtering events',
    example: new Date(),
    required: true
  })
  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;
}
