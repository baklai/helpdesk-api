import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Location {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true })
  readonly region?: string;
}

export type LocationDocument = HydratedDocument<Location>;

export const LocationSchema = SchemaFactory.createForClass(Location);
