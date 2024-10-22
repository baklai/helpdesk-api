import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsMongoId, IsOptional, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Organization {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'Назва організації (має бути унікальною)',
    example: 'ABC Corporation'
  })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Адреса організації',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
  readonly address: string;

  @ApiPropertyOptional({
    description: 'Опис організації',
    example: 'Провідний постачальник інноваційних рішень'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
  readonly description: string;

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

export type OrganizationDocument = HydratedDocument<Organization>;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
