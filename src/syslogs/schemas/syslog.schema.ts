import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SyslogDocument = HydratedDocument<Syslog>;

@Schema()
export class Syslog {
  @Prop({ type: String })
  host: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: String, trim: true })
  method: string;

  @Prop({ type: String, trim: true })
  baseUrl: string;

  @Prop({ type: String })
  params: string;

  @Prop({ type: String })
  query: string;

  @Prop({ type: String })
  body: string;

  @Prop({ type: Number })
  status: number;

  @Prop({ type: String })
  userAgent: string;
}

export const SyslogSchema = SchemaFactory.createForClass(Syslog);
