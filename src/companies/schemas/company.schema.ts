import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  name: string;

  @Prop({ type: String, trim: true })
  address?: string;

  @Prop({ type: String, trim: true })
  description?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
