import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, unique: true })
  readonly user: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly value: string;

  @Prop({ type: Date, default: Date.now, expires: '30d' })
  readonly expiresAt?: Date;
}

export type TokenDocument = HydratedDocument<Token>;

export const TokenSchema = SchemaFactory.createForClass(Token);
