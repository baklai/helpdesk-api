import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';

@Schema()
export class RefreshToken {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    trim: true,
    autopopulate: false
  })
  userId: User;

  @Prop({ type: String, required: true, unique: true, trim: true })
  refreshToken: string;
}

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
