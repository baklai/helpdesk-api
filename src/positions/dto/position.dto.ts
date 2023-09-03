import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class PositionDto extends MongoSchemaDto {
  @ApiProperty({
    description: 'The name of the position (must be unique)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
}
