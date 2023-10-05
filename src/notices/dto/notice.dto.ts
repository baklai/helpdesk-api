import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoticeDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

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

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}
