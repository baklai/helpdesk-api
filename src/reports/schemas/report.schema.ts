import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Report {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The creator of the report',
    example: 'John Doe'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly creator: string;

  @ApiProperty({
    description: 'The name of the report (must be unique)',
    example: 'Router TP-Link'
  })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'A description about the report',
    example: 'Core router for the main network.'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiProperty({
    description: 'The data collection of the report',
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

export type ReportDocument = HydratedDocument<Report>;

export const ReportSchema = SchemaFactory.createForClass(Report);
