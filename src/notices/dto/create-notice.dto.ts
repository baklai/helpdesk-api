import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({
    description: 'The name of the notice',
    example: 'Important Announcement'
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'The text of the notice',
    example: 'Please be informed about the upcoming maintenance on...'
  })
  @IsString()
  readonly text: string;

  @ApiProperty({
    description: 'User ID associated with the notification',
    example: '["6299b5cebf44864bfcea37a5"]'
  })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @Type(() => String)
  readonly users: string[];
}
