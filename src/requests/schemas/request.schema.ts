import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Branch } from 'src/branches/schemas/branch.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsIP, IsOptional, IsDate, IsArray } from 'class-validator';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema()
export class Request {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'Full name of the requester', example: 'John Doe' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '12-34-567' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP Address of the requester', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Incoming request number of the requester',
    example: '№125987/01'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly reqnum: string;

  @ApiProperty({ description: 'Request message', example: 'Please fix the issue' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly request: string;

  @ApiPropertyOptional({ description: 'Comment about the request', example: 'Fixed the issue' })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Conclusion about the request', example: 'Issue resolved' })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly conclusion: string;

  @ApiProperty({
    description: 'Document of the associated User',
    example: User
  })
  @IsString()
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  })
  readonly workerOpen: User;

  @ApiPropertyOptional({
    description: 'Document of the associated User',
    example: User
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  })
  readonly workerClose: User;

  @ApiPropertyOptional({
    description: 'Document of the associated Position',
    example: Position
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    trim: true,
    autopopulate: true
  })
  readonly position: Position;

  @ApiPropertyOptional({
    description: 'Document of the associated Location',
    example: Location
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    trim: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    trim: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    trim: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    trim: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    trim: true,
    autopopulate: true
  })
  readonly department: Department;

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

export class PaginateRequest extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Request], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: Request[];
}

export type RequestDocument = HydratedDocument<Request>;

export const RequestSchema = SchemaFactory.createForClass(Request);

RequestSchema.virtual('status').get(function () {
  return this?.workerClose ? true : false;
});
