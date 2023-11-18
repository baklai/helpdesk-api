import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsIP, IsDate, IsOptional, IsArray } from 'class-validator';
import { HydratedDocument } from 'mongoose';

import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';

@Schema({ strict: false })
export class Ping {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'The host address', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @Prop({ type: String, trim: true })
  readonly host: string;

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

export class PaginatePing extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Ping], description: 'Array of documents' })
  @IsArray()
  @IsOptional()
  docs: Ping[];
}

export type PingDocument = HydratedDocument<Ping>;

export const PingSchema = SchemaFactory.createForClass(Ping);
