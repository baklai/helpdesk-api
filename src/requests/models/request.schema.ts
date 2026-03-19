import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RequestStatusType } from 'src/common/enums/status.enum';

@Schema()
export class Request {
  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @Prop({ type: String, required: true, trim: true })
  readonly phone: string;

  @Prop({ type: String, trim: true })
  readonly ipaddress: string;

  @Prop({ type: String, trim: true })
  readonly reqnum: string;

  @Prop({ type: String, required: true, trim: true })
  readonly request: string;

  @Prop({ type: String, trim: true })
  readonly comment: string;

  @Prop({ type: String, trim: true })
  readonly conclusion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  readonly opened: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  readonly closed: mongoose.Types.ObjectId;

  @Prop({ type: String, enum: RequestStatusType, default: RequestStatusType.OPENED })
  readonly status: RequestStatusType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Position', default: null })
  readonly position: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: null })
  readonly location: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null })
  readonly organization: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subdivision', default: null })
  readonly subdivision: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null })
  readonly department: mongoose.Types.ObjectId;
}

export type RequestDocument = HydratedDocument<Request>;

export const RequestSchema = SchemaFactory.createForClass(Request);
