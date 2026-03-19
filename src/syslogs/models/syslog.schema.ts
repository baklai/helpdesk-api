import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class SysLog {
  @Prop({ type: String, trim: true })
  readonly ipaddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  readonly user: mongoose.Types.ObjectId;

  @Prop({ type: String, trim: true })
  readonly method: string;

  @Prop({ type: String, trim: true })
  readonly methodName: string;

  @Prop({ type: Number })
  readonly status: number;

  @Prop({ type: String, trim: true })
  readonly userAgent: string;

  @Prop({ type: String, trim: true, default: null })
  readonly error?: string;

  @Prop({ type: Date, default: Date.now, expires: '180d' })
  readonly expiresAt?: Date;
}

export type SysLogDocument = HydratedDocument<SysLog>;

export const SysLogSchema = SchemaFactory.createForClass(SysLog);
