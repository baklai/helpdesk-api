import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SysConf {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly key: string;

  @Prop({ type: String, trim: true, default: null })
  readonly value?: string;
}

export type SysConfDocument = HydratedDocument<SysConf>;

export const SysConfSchema = SchemaFactory.createForClass(SysConf);
