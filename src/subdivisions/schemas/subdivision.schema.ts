import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsDate } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Organization } from 'src/organizations/schemas/organization.schema';

@Schema()
export class Subdivision {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiPropertyOptional({
    description: 'Код підрозділу',
    example: 'TSInc'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
  readonly code: string;

  @ApiProperty({
    description: 'Назва підрозділу (має бути унікальною)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Адреса підрозділу',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
  readonly address: string;

  @ApiPropertyOptional({
    description: 'Опис підрозділа',
    example: 'Підрозділ передових технологій, що спеціалізується на програмних рішеннях'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
  readonly description: string;

  @ApiProperty({
    description: 'Документ асоційованої організації',
    example: Organization
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    autopopulate: true
  })
  readonly organization: Organization;

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

export type SubdivisionDocument = HydratedDocument<Subdivision>;

export const SubdivisionSchema = SchemaFactory.createForClass(Subdivision);
