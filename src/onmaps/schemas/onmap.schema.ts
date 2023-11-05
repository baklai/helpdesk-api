import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OnmapDocument = HydratedDocument<Onmap>;

@Schema({ strict: false })
export class Onmap {
  @Prop({ type: String, required: true, unique: true, trim: true })
  target: string;
}

export const OnmapSchema = SchemaFactory.createForClass(Onmap);
