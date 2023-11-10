import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

import { Location } from 'src/locations/schemas/location.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Branch } from 'src/branches/schemas/branch.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema()
export class Mailbox {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: Types.ObjectId;

  @ApiProperty({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/12/2023'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly reqnum: string;

  @ApiProperty({ description: 'E-Mail login', example: 'john.doe1985' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly login: string;

  @ApiProperty({ description: 'Date when email was opened', example: new Date() })
  @IsDate()
  @Prop({ type: Date, required: true, trim: true })
  readonly dateOpen: Date;

  @ApiProperty({ description: 'Fullname of email owner', example: 'John Doe' })
  @IsString()
  @Prop({ type: String, trim: true })
  fullname: string;

  @ApiProperty({ description: 'Client phone number', example: '1234-56-78' })
  @IsString()
  @Prop({ type: String, trim: true })
  readonly phone: string;

  @ApiPropertyOptional({
    description: 'Document of the associated Location',
    example: Location
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: Types.ObjectId,
    ref: 'Location',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly location: Location;

  @ApiPropertyOptional({
    description: 'Document of the associated Company',
    example: Company
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: Types.ObjectId,
    ref: 'Company',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly company: Company;

  @ApiPropertyOptional({
    description: 'Document of the associated Branch',
    example: Branch
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: Types.ObjectId,
    ref: 'Branch',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly branch: Branch;

  @ApiPropertyOptional({
    description: 'Document of the associated Enterprise',
    example: Enterprise
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: Types.ObjectId,
    ref: 'Enterprise',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly enterprise: Enterprise;

  @ApiPropertyOptional({
    description: 'Document of the associated Department',
    example: Department
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: Types.ObjectId,
    ref: 'Department',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly department: Department;

  @ApiPropertyOptional({
    description: 'Document of the associated Position',
    example: Position
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: Types.ObjectId,
    ref: 'Position',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly position: Position;

  @ApiPropertyOptional({ description: 'Date when email was closed', example: new Date() })
  @IsDate()
  @IsOptional()
  @Prop({ type: Date, trim: true })
  readonly dateClose: Date;

  @ApiPropertyOptional({
    description: 'Comment about email',
    example: 'This user has several mailboxes'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly comment: string;

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

export class PaginateMailbox extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Mailbox], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: Mailbox[];
}

export type MailboxDocument = HydratedDocument<Mailbox>;

export const MailboxSchema = SchemaFactory.createForClass(Mailbox);

MailboxSchema.virtual('status').get(function () {
  if (this?.dateOpen && !this?.dateClose) return true;
  return false;
});
