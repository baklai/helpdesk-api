import { Field, ID, InputType } from '@nestjs/graphql';
import { ArrayUnique, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { NoticeStatusType } from 'src/common/enums/status.enum';

@InputType({ description: 'Створення сповіщення' })
export class CreateNoticeInput {
  @Field(() => String, { description: 'Заголовок повідомлення' })
  @IsString({ message: 'Заголовок має бути рядком' })
  @IsNotEmpty({ message: 'Заголовок є обов’язковим' })
  readonly title: string;

  @Field(() => String, { description: 'Текст повідомлення' })
  @IsString({ message: 'Текст повідомлення має бути рядком' })
  @IsNotEmpty({ message: 'Текст повідомлення є обов’язковим' })
  readonly message: string;

  @Field(() => NoticeStatusType, {
    description: 'Рівень важливості',
    defaultValue: NoticeStatusType.INFO
  })
  @IsEnum(NoticeStatusType, { message: 'Недійсний статус повідомлення' })
  readonly status: NoticeStatusType;

  @Field(() => [ID], { description: 'Список ідентифікаторів користувачів' })
  @IsArray({ message: 'Користувачі мають бути масивом' })
  @ArrayUnique({ message: 'Ідентифікатори користувачів мають бути унікальними' })
  @IsMongoId({
    each: true,
    message: 'Кожний ідентифікатор користувача має бути дійсним ідентифікатором'
  })
  readonly users: string[];
}
