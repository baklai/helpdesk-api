import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoticeDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

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

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: '2021-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: '2022-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt?: Date;
}
