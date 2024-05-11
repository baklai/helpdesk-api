import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDate, IsOptional } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Notice {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The title of the notice',
    example: 'Important Announcement'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly title: string;

  @ApiProperty({
    description: 'The text of the notice',
    example: 'Please be informed about the upcoming maintenance on...'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly text: string;

  @ApiProperty({
    description: 'User ID associated with the notification',
    example: '6299b5cebf44864bfcea37a5'
  })
  @IsString()
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: false
  })
  readonly user: User;

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

export type NoticeDocument = HydratedDocument<Notice>;

export const NoticeSchema = SchemaFactory.createForClass(Notice);
