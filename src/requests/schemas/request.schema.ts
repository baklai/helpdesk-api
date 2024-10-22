import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsIP, IsOptional, IsDate, IsArray } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Profile } from 'src/profiles/schemas/profile.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { Organization } from 'src/organizations/schemas/organization.schema';
import { Subdivision } from 'src/subdivisions/schemas/subdivision.schema';
import { Department } from 'src/departments/schemas/department.schema';

import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema()
export class Request {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'П.І.Б. запитувача', example: 'John Doe' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @ApiProperty({ description: 'Номер телефону запитувача', example: '12-34-567' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP-адреса запитувача', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Номер вхідного запиту запитувача',
    example: '№125987/01'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly reqnum: string;

  @ApiProperty({ description: 'Запит повідомлення', example: 'Будь ласка, вирішіть проблему' })
  @IsString()
  @Prop({ type: String, required: true, trim: true })
  readonly request: string;

  @ApiPropertyOptional({ description: 'Прокоментуйте запит', example: 'Виправлено проблему' })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Висновок про запит', example: 'Питання вирішено' })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly conclusion: string;

  @ApiProperty({
    description: "Документ пов'язаного профілю",
    example: Profile
  })
  @IsString()
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
    autopopulate: true
  })
  readonly workerOpen: Profile;

  @ApiPropertyOptional({
    description: "Документ пов'язаного профілю",
    example: Profile
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    autopopulate: true
  })
  readonly workerClose: Profile;

  @ApiPropertyOptional({
    description: 'Документ про відповідну посаду',
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
    description: 'Документ про відповідне місцезнаходження',
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
    autopopulate: true
  })
  readonly department: Department;

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

export class PaginateRequest extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Request], description: 'Масив документів' })
  @IsArray()
  @IsOptional()
  docs: Request[];
}

export type RequestDocument = HydratedDocument<Request>;

export const RequestSchema = SchemaFactory.createForClass(Request);

RequestSchema.virtual('status').get(function () {
  return this?.workerClose ? true : false;
});
