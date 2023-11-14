import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsDate } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Company {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the company (must be unique)',
    example: 'ABC Corporation'
  })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the company',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the company',
    example: 'A leading provider of innovative solutions.'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

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

export type CompanyDocument = HydratedDocument<Company>;

export const CompanySchema = SchemaFactory.createForClass(Company);
