import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  IsDate
} from 'class-validator';
import { HydratedDocument } from 'mongoose';

import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { Scope } from 'src/common/enums/scope.enum';

@Schema()
export class Profile {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'The email of the profile', example: 'john@example.com' })
  @IsEmail()
  @IsString()
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true
  })
  readonly email: string;

  @Prop({ type: String, required: true, trim: true, minLength: 6, select: false })
  readonly password: string;

  @ApiProperty({ description: 'The full name of the profile', example: 'John Doe' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @ApiProperty({ description: 'The phone number of the profile', example: '+38(234)567-89-10' })
  @IsString()
  @IsPhoneNumber()
  @Prop({
    type: String,
    required: true,
    trim: true
  })
  readonly phone: string;

  @ApiPropertyOptional({
    description: 'Flag indicating if the profile is active',
    default: false,
    example: true
  })
  @IsBoolean()
  @IsOptional()
  @Prop({ type: Boolean, default: false })
  readonly isActivated: boolean;

  @ApiPropertyOptional({
    description: 'Flag indicating if the profile is an admin',
    default: false,
    example: false
  })
  @IsBoolean()
  @IsOptional()
  @Prop({ type: Boolean, default: false })
  readonly isAdmin: boolean;

  @ApiPropertyOptional({
    description: "The profile's scope",
    default: [],
    example: [
      Scope.EventRead,
      Scope.ChannelRead,
      Scope.IpaddressRead,
      Scope.RequestRead,
      Scope.InspectorRead,
      Scope.OrganizationRead,
      Scope.SubdivisionRead,
      Scope.DepartmentRead,
      Scope.PositionRead,
      Scope.LocationRead,
      Scope.UnitRead,
      Scope.FilterRead,
      Scope.StatisticNetworkRead,
      Scope.StatisticRequestRead,
      Scope.StatisticInspectorRead
    ]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Prop({ type: [String], default: [] })
  readonly scope: Scope;

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

export class PaginateProfile extends PaginateResponseDto {
  @ApiProperty({ type: [Profile], description: 'Array of documents' })
  docs: Profile[];
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
