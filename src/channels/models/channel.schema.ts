import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Channel {
  @Prop({ type: String, required: true, trim: true })
  readonly locationFrom: string;

  @Prop({ type: String, required: true, trim: true })
  readonly deviceFrom: string;

  @Prop({ type: String, required: true, trim: true })
  readonly locationTo: string;

  @Prop({ type: String, required: true, trim: true })
  readonly deviceTo: string;

  @Prop({ type: String, required: true, trim: true })
  readonly level: string;

  @Prop({ type: String, required: true, trim: true })
  readonly channelType: string;

  @Prop({ type: String, required: true, trim: true })
  readonly speed: string;

  @Prop({ type: String, required: true, trim: true })
  readonly status: string;

  @Prop({ type: String, required: true, trim: true })
  readonly operator: string;

  @Prop({ type: String, required: true, trim: true })
  readonly composition: string;
}

export type ChannelDocument = HydratedDocument<Channel>;

export const ChannelSchema = SchemaFactory.createForClass(Channel);
