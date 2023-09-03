import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class LocationDto extends MongoSchemaDto {
  @ApiProperty({
    description: 'The name of the location (must be unique)',
    example: 'Headquarters'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The region of the location',
    example: 'North America'
  })
  @IsString()
  @IsOptional()
  readonly region?: string;
}
