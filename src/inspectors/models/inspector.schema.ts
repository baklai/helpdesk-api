import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Inspector {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly ipaddress: string;

  @Prop({ type: Object, default: null })
  readonly baseboard?: Record<string, any>;

  @Prop({ type: Object, default: null })
  readonly bios?: Record<string, any>;

  @Prop({ type: Object, default: null })
  readonly os?: Record<string, any>;

  @Prop({ type: [Object], default: [] })
  readonly cpu?: any[];

  @Prop({ type: [Object], default: [] })
  readonly diskdrive?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly memorychip?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly netadapter: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly videoadapter?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly display?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly sound?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly printer?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly product?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly fixupdate?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly share?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly useraccount?: Record<string, any>[];

  @Prop({ type: [Object], default: [] })
  readonly usergroup?: Record<string, any>[];

  @Prop({ type: [String], default: [] })
  readonly useradmin?: string[];

  @Prop({ type: Date, default: Date.now, expires: '365d' })
  readonly expiresAt?: Date;
}

export type InspectorDocument = HydratedDocument<Inspector>;
export const InspectorSchema = SchemaFactory.createForClass(Inspector);

InspectorSchema.index({ ipaddress: 1, updatedAt: -1 });
