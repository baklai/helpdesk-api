import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'The name of the location (must be unique)',
    example: 'Headquarters'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The region of the location',
    example: 'North America'
  })
  @IsString()
  @IsOptional()
  readonly region: string;
}
