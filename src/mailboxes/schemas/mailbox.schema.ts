import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

import { Location } from 'src/locations/schemas/location.schema';
import { Subdivision } from 'src/subdivisions/schemas/subdivision.schema';
import { Organization } from 'src/organizations/schemas/organization.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema()
export class Mailbox {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'Номер вхідного листа',
    example: 'Номер вхідного листа №548925 від 12/12/2023'
  })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly reqnum: string;

  @ApiProperty({ description: 'Логін електронної пошти', example: 'john.doe1985' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly login: string;

  @ApiProperty({ description: 'Дата відкриття електронної пошти', example: new Date() })
  @IsDate()
  @Prop({ type: Date, required: true, trim: true })
  readonly dateOpen: Date;

  @ApiProperty({ description: "Повне ім'я власника електронної пошти", example: 'John Doe' })
  @IsString()
  @Prop({ type: String, trim: true })
  fullname: string;

  @ApiProperty({ description: 'Номер телефону власника електронної пошти', example: '1234-56-78' })
  @IsString()
  @Prop({ type: String, trim: true })
  readonly phone: string;

  @ApiPropertyOptional({
    description: "Документ пов'язаного місцезнаходження",
    example: Location
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly location: Location;

  @ApiPropertyOptional({
    description: 'Документ асоційованої організації',
    example: Organization
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly organization: Organization;

  @ApiPropertyOptional({
    description: 'Документ асоційованого підрозділу',
    example: Subdivision
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subdivision',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly subdivision: Subdivision;

  @ApiPropertyOptional({
    description: 'Документ асоційованого відділу',
    example: Department
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly department: Department;

  @ApiPropertyOptional({
    description: "Документ пов'язаної посади",
    example: Position
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    trim: true,
    default: null,
    autopopulate: true
  })
  readonly position: Position;

  @ApiPropertyOptional({
    description: 'Дата, коли електронна пошта була закрита',
    example: new Date()
  })
  @IsDate()
  @IsOptional()
  @Prop({ type: Date, trim: true })
  readonly dateClose: Date;

  @ApiPropertyOptional({
    description: 'Коментар про електронну пошту',
    example: 'Цей профіль має кілька поштових скриньок'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly comment: string;

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

export class PaginateMailbox extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Mailbox], description: 'Масив документів' })
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
