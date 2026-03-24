import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Subdivision {
  @Prop({ type: String, trim: true, default: null })
  readonly code?: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true, default: null })
  readonly address?: string;

  @Prop({ type: String, trim: true, default: null })
  readonly description?: string;
}

export type SubdivisionDocument = HydratedDocument<Subdivision>;

export const SubdivisionSchema = SchemaFactory.createForClass(Subdivision);
