import { ArgsType, Field } from '@nestjs/graphql';
import { IsIP, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class SysToolsArgs {
  @Field(() => String, { description: 'IP-адреса хоста для системних перевірок' })
  @IsString({ message: 'Хост має бути рядком' })
  @IsNotEmpty({ message: 'Хост є обов’язковим' })
  @IsIP(4, { message: 'Недійсний формат IPv4-адреси' })
  readonly host: string;
}
