import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: false
  })
  userId: User;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
