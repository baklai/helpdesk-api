import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

import { EventType } from '../schemas/event.schema';

export class EventDto extends MongoSchemaDto {
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
}
