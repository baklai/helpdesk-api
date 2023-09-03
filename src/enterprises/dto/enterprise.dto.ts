import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class EnterpriseDto extends MongoSchemaDto {
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
  @IsOptional()
  readonly address?: string;

  @ApiPropertyOptional({
    description: 'A description about the enterprise',
    example: 'A cutting-edge technology company specializing in software solutions.'
  })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
