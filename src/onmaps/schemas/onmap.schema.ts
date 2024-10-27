import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsIP, IsDate, IsOptional, IsArray } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
@Schema({ strict: false })
export class Onmap {
  @ApiProperty({
    description: 'ID запису (унікальний)',
    example: '6299b5cebf44864bfcea36d4',
    type: String
  })
  @IsString()
  @IsMongoId()
  readonly id: string;
  @ApiProperty({ description: 'Цільова адреса', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @Prop({ type: String, trim: true })
  readonly target: string;
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
export class PaginateOnmap extends PaginateResponseDto {
  @ApiPropertyOptional({ type: [Onmap], description: 'Масив документів' })
  @IsArray()
  @IsOptional()
  docs: Onmap[];
}
export type OnmapDocument = HydratedDocument<Onmap>;
export const OnmapSchema = SchemaFactory.createForClass(Onmap);
