import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true })
  readonly organization: mongoose.Types.ObjectId;
}

export type SubdivisionDocument = HydratedDocument<Subdivision>;

export const SubdivisionSchema = SchemaFactory.createForClass(Subdivision);
