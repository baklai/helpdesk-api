import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

@ArgsType()
export class EventArgs {
  @Field(() => Date, { description: 'Дата початку періоду' })
  @Type(() => Date)
  @IsDate({ message: 'Недійсний формат дати початку' })
  @IsNotEmpty({ message: 'Дата початку є обов’язковою' })
  readonly startDateTime: Date;

  @Field(() => Date, { description: 'Дата закінчення періоду' })
  @Type(() => Date)
  @IsDate({ message: 'Недійсний формат дати закінчення' })
  @IsNotEmpty({ message: 'Дата закінчення є обов’язковою' })
  readonly endDateTime: Date;
}
