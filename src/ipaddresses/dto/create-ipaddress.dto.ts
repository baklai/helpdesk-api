import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIP, IsDate, IsString, IsMongoId, ValidateNested, IsOptional } from 'class-validator';

import { CIDR, Internet } from '../schemas/ipaddress.schema';

export class CreateIpaddressDto {
  @ApiProperty({ description: 'IP-адреса', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  readonly ipaddress: string;

  @ApiProperty({ description: 'Інформація CIDR', example: CIDR })
  @ValidateNested()
  readonly cidr: CIDR;

  @ApiProperty({ description: 'Номер вхідного запиту', example: '№1234/56' })
  @IsString()
  readonly reqnum: string;

  @ApiProperty({ description: 'Дата створення запису', example: new Date() })
  @IsDate()
  readonly date: Date;

  @ApiProperty({ description: "Повне ім'я клієнта", example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Номер телефону власника електронної пошти', example: '1234-56-78' })
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'Текст коментаря', example: 'Доступ до мережі обмежено' })
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({
    description: 'Інформація по Інтернет',
    example: Internet
  })
  @IsOptional()
  readonly internet: Internet;

  @ApiPropertyOptional({ description: 'Автовідповідь', example: '(12 3456 7)89' })
  @IsString()
  @IsOptional()
  readonly autoanswer: string;

  @ApiPropertyOptional({
    description: "Ідентифікатор пов'язаного пристрою",
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly unit: string;

  @ApiPropertyOptional({
    description: 'ID пов’язаного розташування',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({
    description: 'ID асоційованої організації',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly organization: string;

  @ApiPropertyOptional({
    description: "Ідентифікатор пов'язаного підрозділу",
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly subdivision: string;

  @ApiPropertyOptional({
    description: "Ідентифікатор пов'язаного відділу",
    example: '6299b5cebf44864bfcea3772'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly department: string;

  @ApiPropertyOptional({
    description: "Ідентифікатор пов'язаної посади",
    example: '6299b5cebf44864bfcea391a'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly position: string;
}
