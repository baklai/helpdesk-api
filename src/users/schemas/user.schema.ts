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
export class User {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'The login of the user', example: 'JohnDoe' })
  @IsString()
  @Prop({ type: String, required: true, unique: true, uniqueCaseInsensitive: true, trim: true })
  readonly login: string;

  @Prop({ type: String, required: true, trim: true, minLength: 6, select: false })
  readonly password: string;

  @ApiProperty({ description: 'The full name of the user', example: 'John Doe' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
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

  @ApiProperty({ description: 'The phone number of the user', example: '+38(234)567-89-10' })
  @IsString()
  @IsPhoneNumber()
  @Prop({
    type: String,
    required: true,
    trim: true
  })
  readonly phone: string;

  @ApiPropertyOptional({
    description: 'Flag indicating if the user is active',
    default: false,
    example: true
  })
  @IsBoolean()
  @IsOptional()
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiPropertyOptional({
    description: 'Flag indicating if the user is an admin',
    default: false,
    example: false
  })
  @IsBoolean()
  @IsOptional()
  @Prop({ type: Boolean, default: false })
  readonly isAdmin: boolean;

  @ApiPropertyOptional({
    description: 'Flag indicating if the user is on subscription',
    default: false,
    example: false
  })
  @IsBoolean()
  @IsOptional()
  @Prop({ type: Boolean, default: false })
  readonly isSubscribed: boolean;

  @ApiPropertyOptional({
    description: "The user's scope",
    default: [],
    example: [
      Scope.EventRead,
      Scope.ChannelRead,
      Scope.IpaddressRead,
      Scope.RequestRead,
      Scope.InspectorRead,
      Scope.ChannelRead,
      Scope.OrganizationRead,
      Scope.SubdivisionRead,
      Scope.DepartmentRead,
      Scope.PositionRead,
      Scope.UnitRead,
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

export class PaginateUser extends PaginateResponseDto {
  @ApiProperty({ type: [User], description: 'Array of documents' })
  docs: User[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
