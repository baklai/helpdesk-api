import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SyslogDocument = HydratedDocument<Syslog>;

@Schema()
export class Syslog {
  @Prop({ type: String, trim: true })
  method: string;

  @Prop({ type: String, trim: true })
  url: string;

  @Prop({ type: Number })
  status: number;

  @Prop({ type: Number })
  responseTime: number;

  @Prop({ type: String, trim: true })
  payload: string;
}

export const SyslogSchema = SchemaFactory.createForClass(Syslog);
