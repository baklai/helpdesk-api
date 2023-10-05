import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({ description: 'The name of the unit (must be unique)', example: 'Router TP-Link' })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'A description about the unit',
    example: 'Core router for the main network.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
