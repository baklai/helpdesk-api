import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Назва пристрою (повинна бути унікальною)',
    example: 'Маршрутизатор TP-Link'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Опис пристрою',
    example: 'Основний маршрутизатор для головної мережі.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
