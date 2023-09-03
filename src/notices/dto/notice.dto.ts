import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class NoticeDto extends MongoSchemaDto {
  @ApiProperty({
    description: 'The name of the notice',
    example: 'Important Announcement'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The text of the notice',
    example: 'Please be informed about the upcoming maintenance on...'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({
    description: 'User ID associated with the notification',
    example: '6299b5cebf44864bfcea37a5'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly userId: string;
}
