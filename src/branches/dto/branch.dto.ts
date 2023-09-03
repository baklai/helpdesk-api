import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class BranchDto extends MongoSchemaDto {
  @ApiProperty({
    description: 'The name of the branch (must be unique)',
    example: 'Downtown Branch'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the branch',
    example: '123 Main Street, Cityville'
  })
  @IsString()
  @IsOptional()
  readonly address?: string;

  @ApiPropertyOptional({
    description: 'A description about the branch',
    example: 'This branch is located in the heart of the city.'
  })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
