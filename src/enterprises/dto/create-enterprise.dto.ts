import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEnterpriseDto {
  @ApiProperty({
    description: 'The name of the enterprise (must be unique)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the enterprise',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the enterprise',
    example: 'A cutting-edge technology company specializing in software solutions.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
