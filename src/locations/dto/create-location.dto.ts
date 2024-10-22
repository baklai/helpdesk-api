import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Назва локації (має бути унікальною)',
    example: 'Headquarters'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Регіон розташування',
    example: 'North America'
  })
  @IsString()
  @IsOptional()
  readonly region: string;
}
