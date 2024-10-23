import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMailboxDto {
  @ApiProperty({
    description: 'Номер вхідного листа',
    example: 'Номер вхідного листа №548925 від 12/12/2023'
  })
  @IsString()
  readonly reqnum: string;

  @ApiProperty({ description: 'Логін електронної пошти', example: 'john.doe1985' })
  @IsString()
  readonly login: string;

  @ApiProperty({ description: "Повне ім'я власника електронної пошти", example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Номер телефону власника електронної пошти', example: '1234-56-78' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'Дата відкриття електронної пошти', example: new Date() })
  @IsDate()
  readonly dateOpen: Date;

  @ApiPropertyOptional({
    description: 'Дата, коли електронна пошта була закрита',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly dateClose: Date;

  @ApiPropertyOptional({
    description: 'Коментар про електронну пошту',
    example: 'Цей профіль має кілька поштових скриньок'
  })
  @IsString()
  @IsOptional()
  readonly comment: string;

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
