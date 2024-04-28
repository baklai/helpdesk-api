import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsDate } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Organization } from 'src/organizations/schemas/organization.schema';

@Schema()
export class Subdivision {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiPropertyOptional({
    description: 'The code of the subdivision',
    example: 'TSInc'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly code: string;

  @ApiProperty({
    description: 'The name of the subdivision (must be unique)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the subdivision',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the subdivision',
    example: 'A cutting-edge technology subdivision specializing in software solutions'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly description: string;

  @ApiProperty({
    description: 'Document of the associated Organization',
    example: Organization
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null,
    autopopulate: true
  })
  readonly organization: Organization;

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

export type SubdivisionDocument = HydratedDocument<Subdivision>;

export const SubdivisionSchema = SchemaFactory.createForClass(Subdivision);
