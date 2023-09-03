import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InspectorDocument = HydratedDocument<Inspector>;

@Schema({ strict: false })
export class Inspector {
  @Prop({ type: String, required: true, unique: true, trim: true })
  host: string;
}

export const InspectorSchema = SchemaFactory.createForClass(Inspector);
