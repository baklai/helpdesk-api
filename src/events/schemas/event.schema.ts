import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDate, IsEnum, IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export enum EventType {
  EVENT = 'event',
  MEETING = 'meeting',
  DEADLINE = 'deadline',
  HOLIDAY = 'holiday',
  BIRTHDAY = 'birthday'
}

@Schema()
export class Event {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'The title of the event', example: 'Meeting with Team' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly title: string;

  @ApiProperty({ description: 'The date and time of the event', example: new Date() })
  @IsDate()
  @Prop({ type: Date, required: true, default: Date.now() })
  readonly datetime: Date;

  @ApiProperty({
    enum: EventType,
    enumName: 'EventType',
    example: EventType.EVENT,
    description: 'The type of the event'
  })
  @IsEnum(EventType, { message: 'Invalid event type' })
  @Prop({
    type: String,
    required: true,
    enum: Object.values(EventType),
    default: EventType.EVENT
  })
  readonly eventType: EventType;

  @ApiPropertyOptional({
    description: 'The description of the event',
    example: 'Discussing project updates'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export type EventDocument = HydratedDocument<Event>;

export const EventSchema = SchemaFactory.createForClass(Event);
