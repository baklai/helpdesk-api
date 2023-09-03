import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChannelDocument = HydratedDocument<Channel>;

@Schema()
export class Channel {
  @Prop({ type: String, required: true, trim: true })
  locationFrom: string;

  @Prop({ type: String, required: true, trim: true })
  unitFrom: string;

  @Prop({ type: String, required: true, trim: true })
  locationTo: string;

  @Prop({ type: String, required: true, trim: true })
  unitTo: string;

  @Prop({ type: String, required: true, trim: true })
  level: string;

  @Prop({ type: String, required: true, trim: true })
  type: string;

  @Prop({ type: String, required: true, trim: true })
  speed: string;

  @Prop({ type: String, required: true, trim: true })
  status: string;

  @Prop({ type: String, required: true, trim: true })
  operator: string;

  @Prop({ type: String, required: true, trim: true })
  composition: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
