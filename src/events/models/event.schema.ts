import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventType } from 'src/common/enums/event.enum';

@Schema()
export class Event {
  @Prop({ type: String, required: true, trim: true })
  readonly title: string;

  @Prop({ type: String, trim: true })
  readonly description?: string;

  @Prop({ type: Date, required: true })
  readonly startDateTime: Date;

  @Prop({ type: Date, required: true })
  readonly endDateTime: Date;

  @Prop({ type: String, trim: true })
  readonly location?: string;

  @Prop({ type: String, enum: EventType, default: EventType.EVENT })
  readonly eventType?: EventType;

  @Prop({ type: [String], default: [] })
  readonly participants?: string[];

  @Prop({ type: Date, default: Date.now, expires: '365d' })
  readonly expiresAt?: Date;
}

export type EventDocument = HydratedDocument<Event>;

export const EventSchema = SchemaFactory.createForClass(Event);
