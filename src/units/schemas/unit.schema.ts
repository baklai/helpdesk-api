import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UnitDocument = HydratedDocument<Unit>;

@Schema()
export class Unit {
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  name: string;

  @Prop({ type: String, trim: true })
  description?: string;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
