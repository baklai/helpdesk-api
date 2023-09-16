import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  name: string;

  @Prop({ type: String, trim: true })
  region: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
