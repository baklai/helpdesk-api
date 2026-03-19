import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Авторизація користувача' })
export class SigninAuthInput {
  @Field(() => String, { description: 'Електронна пошта' })
  @IsEmail({}, { message: 'Некоректний формат електронної пошти' })
  @IsNotEmpty({ message: 'Електронна пошта не може бути порожньою' })
  readonly email: string;

  @Field(() => String, { description: 'Пароль' })
  @IsString({ message: 'Пароль має бути рядком' })
  @IsNotEmpty({ message: 'Пароль не може бути порожнім' })
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  readonly password: string;
}
