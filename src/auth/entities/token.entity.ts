import { Field, ID, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';

@ObjectType('Token', { description: 'JWT токен' })
export class TokenEntity {
  @Field(() => ID, { description: 'Ідентифікатор запису' })
  readonly id: string;

  @Field(() => ID, { description: 'Ідентифікатор користувача' })
  readonly user: mongoose.Types.ObjectId;

  @Field(() => String, { description: 'Токен оновлення (Refresh Token)' })
  readonly value: string;

  @Field(() => Date, { nullable: true, description: 'Дата автоматичного видалення 30 днів' })
  readonly expiresAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата створення запису' })
  readonly createdAt?: Date;

  @Field(() => Date, { nullable: true, description: 'Дата оновлення запису' })
  readonly updatedAt?: Date;
}
