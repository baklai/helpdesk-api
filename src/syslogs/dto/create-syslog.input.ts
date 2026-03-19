import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Створення системного логу' })
export class CreateSysLogInput {
  @Field(() => String, { description: 'IP-адреса або хост запиту' })
  @IsString({ message: 'IP-адреса або хост має бути рядком' })
  @IsNotEmpty({ message: 'IP-адреса або хост є обов’язковим' })
  readonly ipaddress: string;

  @Field(() => ID, { nullable: true, description: 'Ідентифікатор користувача' })
  @IsOptional()
  @IsMongoId({ message: 'Ідентифікатор користувача має бути дійсним ідентифікатором' })
  readonly user?: string;

  @Field(() => String, { description: 'Метод "QUERY" чи "MUTATION"' })
  @IsString({ message: 'Метод запиту має бути рядком' })
  @IsNotEmpty({ message: 'Метод запиту є обов’язковим' })
  readonly method: string;

  @Field(() => String, { description: 'Назва метода' })
  @IsString({ message: 'Назва метода має бути рядком' })
  @IsNotEmpty({ message: 'Назва метода є обов’язковою' })
  readonly methodName: string;

  @Field(() => Int, { description: 'Статус відповіді' })
  @IsInt({ message: 'Статус запиту має бути цілим числом' })
  @IsNotEmpty({ message: 'Статус запиту є обов’язковим' })
  readonly status: number;

  @Field(() => String, { description: 'Інформація про браузер/клієнт' })
  @IsString({ message: 'Агент користувача має бути рядком' })
  @IsNotEmpty({ message: 'Агент користувача є обов’язковим' })
  readonly userAgent: string;

  @Field(() => String, { nullable: true, description: 'Інформація про помилку' })
  @IsOptional()
  readonly error?: string;
}
