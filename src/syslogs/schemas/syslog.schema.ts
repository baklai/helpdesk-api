import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SyslogDocument = HydratedDocument<Syslog>;

@Schema()
export class Syslog {
  @Prop({ type: String })
  user: any;

  @Prop({ type: String, trim: true })
  method: string;

  @Prop({ type: String, trim: true })
  baseUrl: string;

  @Prop({ type: String })
  params: any;

  @Prop({ type: String })
  query: any;

  @Prop({ type: String })
  body: any;

  @Prop({ type: Number })
  status: number;
}

export const SyslogSchema = SchemaFactory.createForClass(Syslog);
