import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position {
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  name: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
