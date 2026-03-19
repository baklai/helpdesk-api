import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Device {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true })
  readonly description?: string;
}

export type DeviceDocument = HydratedDocument<Device>;

export const DeviceSchema = SchemaFactory.createForClass(Device);
