import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIP, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'П.І.Б. запитувача', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Номер телефону запитувача', example: '12-34-567' })
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP-адреса запитувача', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsOptional()
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Номер вхідного запиту запитувача',
    example: '№125987/01'
  })
  @IsString()
  @IsOptional()
  readonly reqnum: string;

  @ApiProperty({ description: 'Запит повідомлення', example: 'Будь ласка, вирішіть проблему' })
  @IsString()
  readonly request: string;

  @ApiPropertyOptional({ description: 'Прокоментуйте запит', example: 'Виправлено проблему' })
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Висновок про запит', example: 'Питання вирішено' })
  @IsString()
  @IsOptional()
  readonly conclusion: string;

  @ApiProperty({
    description: "ID пов'язаного профілю",
    example: '6299f5cebf44864bfcea39fa'
  })
  @IsString()
  @IsMongoId()
  readonly workerOpen: string;

  @ApiPropertyOptional({
    description: "ID пов'язаного профілю",
    example: '6299f5cebf44864bfcea39fa'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly workerClose: string;

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
