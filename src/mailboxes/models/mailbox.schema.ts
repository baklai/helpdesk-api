import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MailboxStatusType } from 'src/common/enums/status.enum';

@Schema()
export class Mailbox {
  @Prop({ type: String, required: true, trim: true })
  readonly reqnum: string;

  @Prop({ type: String, required: true, unique: true, trim: true, lowercase: true })
  readonly email: string;

  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @Prop({ type: String, required: true, trim: true })
  readonly phone: string;

  @Prop({ type: String, enum: MailboxStatusType, default: MailboxStatusType.OPENED })
  readonly status: MailboxStatusType;

  @Prop({ type: String, trim: true })
  readonly comment?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null })
  readonly organization: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subdivision', default: null })
  readonly subdivision: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null })
  readonly department: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Position', default: null })
  readonly position: mongoose.Types.ObjectId;
}

export type MailboxDocument = HydratedDocument<Mailbox>;

export const MailboxSchema = SchemaFactory.createForClass(Mailbox);
