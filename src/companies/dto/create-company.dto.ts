import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of the company (must be unique)',
    example: 'ABC Corporation'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the company',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the company',
    example: 'A leading provider of innovative solutions.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
