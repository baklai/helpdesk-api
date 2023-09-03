import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class UnitDto extends MongoSchemaDto {
  @ApiProperty({ description: 'The name of the unit (must be unique)', example: 'Router TP-Link' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'A description about the unit',
    example: 'Core router for the main network.'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;
}
