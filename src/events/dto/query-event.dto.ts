import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class QueryEventDto {
  @ApiProperty({
    description: 'Дата початку фільтрації подій',
    example: new Date(),
    required: true
  })
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({
    description: 'Кінцева дата для фільтрації подій',
    example: new Date(),
    required: true
  })
  @IsDate()
  readonly endDate: Date;
}
