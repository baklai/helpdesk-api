import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class DepartmentDto extends MongoSchemaDto {
  @ApiProperty({
    description: 'The name of the department (must be unique)',
    example: 'Sales Department'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The description of the department',
    example: 'Responsible for driving sales and customer engagement.'
  })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
