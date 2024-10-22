import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Location {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'Назва локації (має бути унікальною)',
    example: 'Headquarters'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Регіон розташування',
    example: 'North America'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly region: string;

  @ApiPropertyOptional({
    description: 'Дата створення запису',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'Дата оновлення запису',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export type LocationDocument = HydratedDocument<Location>;

export const LocationSchema = SchemaFactory.createForClass(Location);
