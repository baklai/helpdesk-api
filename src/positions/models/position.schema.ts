import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Position {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true })
  readonly description: string;
}

export type PositionDocument = HydratedDocument<Position>;

export const PositionSchema = SchemaFactory.createForClass(Position);
