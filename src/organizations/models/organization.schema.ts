import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Organization {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true })
  readonly address?: string;

  @Prop({ type: String, trim: true })
  readonly description?: string;
}

export type OrganizationDocument = HydratedDocument<Organization>;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
