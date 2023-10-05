import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({
    description: 'The name of the notice',
    example: 'Important Announcement'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The text of the notice',
    example: 'Please be informed about the upcoming maintenance on...'
  })
  @IsString()
  readonly text: string;

  @ApiProperty({
    description: 'User ID associated with the notification',
    example: '6299b5cebf44864bfcea37a5'
  })
  @IsString()
  @IsMongoId()
  readonly userId: string;
}
