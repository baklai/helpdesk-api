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
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'Назва заходу', example: 'Зустріч з командою' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly title: string;

  @ApiProperty({ description: 'Дата і час проведення', example: new Date() })
  @IsDate()
  @Prop({ type: Date, required: true, default: Date.now() })
  readonly datetime: Date;

  @ApiProperty({
    enum: EventType,
    enumName: 'EventType',
    example: EventType.EVENT,
    description: 'Тип події'
  })
  @IsEnum(EventType, { message: 'Недійсний тип події' })
  @Prop({
    type: String,
    required: true,
    enum: Object.values(EventType),
    default: EventType.EVENT
  })
  readonly eventType: EventType;

  @ApiPropertyOptional({
    description: 'Опис події',
    example: 'Обговорення оновлень проекту'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiPropertyOptional({
    description: 'Дата створення запису',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'Дата оновлення запису',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export type EventDocument = HydratedDocument<Event>;

export const EventSchema = SchemaFactory.createForClass(Event);
