import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

import { EventType } from '../schemas/event.schema';

export class EventDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'The title of the event', example: 'Meeting with Team' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: 'The date and time of the event', example: '2023-08-25T10:00:00Z' })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  readonly datetime: Date;

  @ApiProperty({
    enum: EventType,
    enumName: 'EventType',
    example: EventType.EVENT,
    description: 'The type of the event'
  })
  @IsEnum(EventType, { message: 'Invalid event type' })
  @IsDefined()
  @IsNotEmpty()
  readonly eventType: EventType;

  @ApiPropertyOptional({
    description: 'The description of the event',
    example: 'Discussing project updates'
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: '2021-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: '2022-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt?: Date;
}
