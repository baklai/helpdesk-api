import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

export enum EventType {
  EVENT = 'event',
  MEETING = 'meeting',
  DEADLINE = 'deadline',
  HOLIDAY = 'holiday',
  BIRTHDAY = 'birthday'
}

@Schema()
export class Event {
  @Prop({ type: String, required: true, trim: true })
  title: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  datetime: Date;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(EventType),
    default: EventType.EVENT
  })
  eventType: EventType;

  @Prop({ type: String, trim: true })
  description: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
