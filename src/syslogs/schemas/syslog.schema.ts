import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsNumber, IsDate, IsArray } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema()
export class Syslog {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @Prop({ type: String })
  readonly host: string;

  @ApiPropertyOptional({
    description: 'The ID of User',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String })
  readonly user: string;

  @ApiPropertyOptional({
    description: 'The method of request',
    example: 'POST'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly method: string;

  @ApiPropertyOptional({
    description: 'The base url of request',
    example: '/units?limit=10&offset=50'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String, trim: true })
  readonly baseUrl: string;

  @ApiPropertyOptional({
    description: 'The params of request',
    example: '{"0":"users"}'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String })
  readonly params: string;

  @ApiPropertyOptional({
    description: 'The query of request',
    example: '{"limit":"10","offset":"50"}'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String })
  readonly query: string;

  @ApiPropertyOptional({
    description: 'The body of request',
    example: '{"name":"Cisco unit"}'
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String })
  readonly body: string;

  @ApiPropertyOptional({
    description: 'The status of request',
    example: 200
  })
  @IsNumber()
  @IsOptional()
  @Prop({ type: Number })
  readonly status: number;

  @ApiPropertyOptional({
    description: 'The user-agent of request',
    example: 200
  })
  @IsString()
  @IsOptional()
  @Prop({ type: String })
  readonly userAgent: string;

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

export class PaginateSyslog extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Syslog], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: Syslog[];
}

export type SyslogDocument = HydratedDocument<Syslog>;

export const SyslogSchema = SchemaFactory.createForClass(Syslog);
