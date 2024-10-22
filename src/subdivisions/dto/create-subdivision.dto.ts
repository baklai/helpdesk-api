import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateSubdivisionDto {
  @ApiPropertyOptional({
    description: 'Код підрозділу',
    example: 'TSInc'
  })
  @IsString()
  @IsOptional()
  readonly code: string;

  @ApiProperty({
    description: 'Назва підрозділу (має бути унікальною)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Адреса підрозділу',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'Опис підрозділа',
    example: 'Підрозділ передових технологій, що спеціалізується на програмних рішеннях.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description: 'ID асоційованої організації',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly organization: string;
}
