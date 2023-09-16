import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEnterpriseDto {
  @ApiProperty({
    description: 'The name of the enterprise (must be unique)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the enterprise',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the enterprise',
    example: 'A cutting-edge technology company specializing in software solutions.'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;
}
