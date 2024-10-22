import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Report {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'Творець звіту',
    example: 'John Doe'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly creator: string;

  @ApiProperty({
    description: 'Назва звіту (має бути унікальною)',
    example: 'Router TP-Link'
  })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Опис про звіт',
    example: 'Основний маршрутизатор для основної мережі.'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiProperty({
    description: 'Збір даних звіту',
    example: 'Router TP-Link'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly datacollection: string;

  @ApiPropertyOptional({
    description: 'A sort of the report',
    example: '{"unit":"Unit name"}'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly fields: string;

  @ApiPropertyOptional({
    description: 'A sort of the report',
    example: '{"reqnum":1,"name":-1}'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly sorts: string;

  @ApiPropertyOptional({
    description: 'A filters of the report',
    example: '{"unit":{"$in":[]}}'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly filters: string;

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

export type ReportDocument = HydratedDocument<Report>;

export const ReportSchema = SchemaFactory.createForClass(Report);
