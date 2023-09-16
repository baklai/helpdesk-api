import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnterpriseDocument = HydratedDocument<Enterprise>;

@Schema()
export class Enterprise {
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  name: string;

  @Prop({ type: String, trim: true })
  address: string;

  @Prop({ type: String, trim: true })
  description: string;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);
