import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Назва організації (має бути унікальною)',
    example: 'ABC Corporation'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Адреса організації',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'Опис організації',
    example: 'Провідний постачальник інноваційних рішень'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
