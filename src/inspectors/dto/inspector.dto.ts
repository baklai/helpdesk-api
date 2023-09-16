import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsIP,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';

export class InspectorDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'The host address', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
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
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: new Date()
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt: Date;
}
