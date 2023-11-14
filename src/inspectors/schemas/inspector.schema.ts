import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsIP, IsObject, IsOptional, IsArray, IsDate } from 'class-validator';
import { HydratedDocument } from 'mongoose';

import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema({ strict: false })
export class Inspector {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'The host address', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly host: string;

  @ApiPropertyOptional({ description: 'The baseboard of the host' })
  @IsObject()
  @IsOptional()
  readonly baseboard: Record<string, any>;

  @ApiPropertyOptional({ description: 'The bios of the host' })
  @IsObject()
  @IsOptional()
  readonly bios: Record<string, any>;

  @ApiPropertyOptional({ description: 'The CPU of the host' })
  @IsObject()
  @IsOptional()
  readonly cpu: Record<string, any>;

  @ApiPropertyOptional({ description: 'The operation system of the host' })
  @IsObject()
  @IsOptional()
  readonly os: Record<string, any>;

  @ApiPropertyOptional({ description: 'The diskdrive of the host' })
  @IsArray()
  @IsOptional()
  readonly diskdrive: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The memorychip of the host' })
  @IsArray()
  @IsOptional()
  readonly memorychip: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The netadapter of the host' })
  @IsArray()
  @IsOptional()
  readonly netadapter: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The printer of the host' })
  @IsArray()
  @IsOptional()
  readonly printer: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The product of the host' })
  @IsArray()
  @IsOptional()
  readonly product: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The share of the host' })
  @IsArray()
  @IsOptional()
  readonly share: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The useraccount of the host' })
  @IsArray()
  @IsOptional()
  readonly useraccount: Record<string, any>[];

  @ApiPropertyOptional({ description: 'The useradmin of the host' })
  @IsArray()
  @IsOptional()
  readonly useradmin: string[];

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

export class PaginateInspector extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Inspector], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: Inspector[];
}

export type InspectorDocument = HydratedDocument<Inspector>;

export const InspectorSchema = SchemaFactory.createForClass(Inspector);
