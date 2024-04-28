import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'The name of the organization (must be unique)',
    example: 'ABC Corporation'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the organization',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the organization',
    example: 'A leading provider of innovative solutions.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
