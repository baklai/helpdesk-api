import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsMongoId, IsOptional, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Organization {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the organization (must be unique)',
    example: 'ABC Corporation'
  })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the organization',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the organization',
    example: 'A leading provider of innovative solutions.'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true, default: null })
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

export type OrganizationDocument = HydratedDocument<Organization>;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
