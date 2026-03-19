import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Report {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true, default: null })
  readonly description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  readonly creator: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, trim: true, index: true })
  readonly datacollection: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  readonly fields: Record<string, string>;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  readonly sorts: Record<string, number>;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  readonly filters: Record<string, any>;
}

export type ReportDocument = HydratedDocument<Report>;

export const ReportSchema = SchemaFactory.createForClass(Report);
