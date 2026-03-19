import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Реєстрація користувача' })
export class SignupAuthInput {
  @Field(() => String, { description: 'Прізвище та ім’я' })
  @IsString({ message: 'Прізвище та ім’я мають бути рядком' })
  @IsNotEmpty({ message: 'Прізвище та ім’я не може бути порожнім' })
  readonly fullname: string;

  @Field(() => String, { description: 'Електронна пошта' })
  @IsEmail({}, { message: 'Некоректний формат електронної пошти' })
  @IsNotEmpty({ message: 'Електронна пошта не може бути порожньою' })
  readonly email: string;

  @Field(() => String, { description: 'Номер телефону' })
  @IsPhoneNumber('UA', { message: 'Некоректний формат номера телефону' })
  @IsNotEmpty({ message: 'Номер телефону не може бути порожнім' })
  readonly phone: string;

  @Field(() => String, { description: 'Пароль' })
  @IsString({ message: 'Пароль має бути рядком' })
  @IsNotEmpty({ message: 'Пароль не може бути порожнім' })
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  readonly password: string;
}
