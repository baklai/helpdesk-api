import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { EventType } from '../schemas/event.schema';

export class CreateEventDto {
  @ApiProperty({ description: 'Назва заходу', example: 'Зустріч з командою' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Дата і час проведення', example: new Date() })
  @IsDate()
  readonly datetime: Date;

  @ApiProperty({
    enum: EventType,
    enumName: 'EventType',
    example: EventType.EVENT,
    description: 'Тип події'
  })
  @IsEnum(EventType, { message: 'Недійсний тип події' })
  readonly eventType: EventType;

  @ApiPropertyOptional({
    description: 'Опис події',
    example: 'Обговорення оновлень проекту'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
