import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';

@Schema()
export class User {
  @Prop({ type: String, required: true, trim: true })
  fullname: string;

  @Prop({ type: String, required: true, lowercase: true, trim: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, trim: true, minLength: 8, select: false })
  password: string;

  @Prop({ type: String, required: true, trim: true })
  phone: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Prop({ type: String, enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  /**
   * Bitmask прав доступу, серіалізований як рядок (BigInt → string).
   * '0' означає відсутність будь-яких прав.
   */
  @Prop({ type: String, default: '0' })
  scope: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
