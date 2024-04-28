import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsIP,
  IsNumber,
  ValidateNested,
  IsDate,
  IsOptional,
  IsArray
} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Netmask } from 'netmask';

import { Unit } from 'src/units/schemas/unit.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { Organization } from 'src/organizations/schemas/organization.schema';
import { Subdivision } from 'src/subdivisions/schemas/subdivision.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

export class CIDR {
  @ApiProperty({ description: 'CIDR Value', example: 24 })
  @IsNumber()
  readonly value: number;

  @ApiProperty({ description: 'CIDR Mask', example: '255.255.255.0' })
  @IsString()
  readonly mask: string;
}

export class Internet {
  @ApiPropertyOptional({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/07/2023'
  })
  @IsString()
  @IsOptional()
  readonly reqnum: string;

  @ApiPropertyOptional({ description: 'Date when internet was opened', example: new Date() })
  @IsDate()
  @IsOptional()
  readonly dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when internet was closed', example: new Date() })
  @IsDate()
  @IsOptional()
  readonly dateClose: Date;

  @ApiPropertyOptional({
    description: 'Comment about internet',
    example: 'Internet is closed of №1234/560'
  })
  @IsString()
  @IsOptional()
  readonly comment: string;
}

@Schema()
export class Ipaddress {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'IP Address', example: '192.168.0.1' })
  @IsIP()
  @IsString()
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly ipaddress: string;

  @ApiProperty({ description: 'Index IP Address', example: 3232235521 })
  @IsNumber()
  @Prop({
    type: Number,
    default: function () {
      if (this?.ipaddress) {
        return new Netmask(this.ipaddress).netLong;
      }
      return null;
    }
  })
  readonly indexip: number;

  @ApiProperty({ description: 'CIDR Information', example: CIDR })
  @ValidateNested()
  @Prop({ type: Object, required: true, default: { value: 24, mask: '255.255.255.0' } })
  readonly cidr: CIDR;

  @ApiProperty({ description: 'Incoming request number', example: '№1234/56' })
  @IsString()
  @Prop({ type: String, required: true, default: null, trim: true })
  readonly reqnum: string;

  @ApiProperty({ description: 'Date of create record', example: new Date() })
  @IsDate()
  @Prop({ type: Date, required: true, trim: true })
  readonly date: Date;

  @ApiProperty({ description: 'Client full name', example: 'John Doe' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @ApiProperty({ description: 'Client phone number', example: '1234-56-78' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  phone: string;

  @ApiPropertyOptional({ description: 'Autoanswer', example: '(12 3456 7)89' })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly autoanswer: string;

  @ApiPropertyOptional({
    description: 'Internet information',
    example: Internet
  })
  @ValidateNested()
  @IsOptional()
  @Prop({
    type: Object,
    default: {
      reqnum: null,
      dateOpen: null,
      dateClose: null,
      comment: null
    }
  })
  readonly internet: Internet;

  @ApiPropertyOptional({ description: 'Comment text', example: 'Network access limited' })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly comment: string;

  @ApiPropertyOptional({
    description: 'Document of the associated Unit',
    example: Unit
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    default: null,
    autopopulate: true
  })
  readonly unit: Unit;

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
    default: null,
    autopopulate: true
  })
  readonly location: Location;

  @ApiPropertyOptional({
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
    description: 'Document of the associated Subdivision',
    example: Subdivision
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subdivision',
    default: null,
    autopopulate: true
  })
  readonly subdivision: Subdivision;

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    default: null,
    autopopulate: true
  })
  readonly position: Position;

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

export class PaginateIpaddress extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Ipaddress], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: Ipaddress[];
}

export type IpaddressDocument = HydratedDocument<Ipaddress>;

export const IpaddressSchema = SchemaFactory.createForClass(Ipaddress);

IpaddressSchema.virtual('mask').get(function () {
  return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.mask : null;
});

IpaddressSchema.virtual('gateway').get(function () {
  return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.first : null;
});

IpaddressSchema.virtual('inetStatus').get(function () {
  if (!this?.internet) return false;
  if (this?.internet?.reqnum && this?.internet?.dateOpen && !this?.internet?.dateClose) return true;
  return false;
});
