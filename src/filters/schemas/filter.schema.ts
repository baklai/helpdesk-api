import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SysfilterDocument = HydratedDocument<Filter>;

export enum FilterType {
  ACCOUNT = 'account',
  SOFTWARE = 'software',
  SHARE = 'share'
}

export enum FilterStatus {
  ALLOW = 'allow',
  DENY = 'deny'
}

@Schema()
export class Filter {
  @Prop({ type: String, required: true, trim: true })
  regex: string;

  @Prop({ type: String, required: true, enum: Object.values(FilterType), trim: true })
  type: FilterType;

  @Prop({ type: String, required: true, enum: Object.values(FilterStatus), trim: true })
  status: FilterStatus;

  @Prop({ type: String, trim: true })
  description?: string;
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
