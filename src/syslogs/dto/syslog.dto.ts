import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class SyslogDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiPropertyOptional({
    description: 'The ID of User',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly user: string;

  @ApiPropertyOptional({
    description: 'The params of request',
    example: '{"0":"users"}'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly params: string;

  @ApiPropertyOptional({
    description: 'The query of request',
    example: '{"limit":"10","offset":"50"}'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly query: string;

  @ApiPropertyOptional({
    description: 'The body of request',
    example: '{"name":"Cisco unit"}'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly body: string;

  @ApiPropertyOptional({
    description: 'The method of request',
    example: 'POST'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly method: string;

  @ApiPropertyOptional({
    description: 'The base url of request',
    example: '/units?limit=10&offset=50'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly baseUrl: string;

  @ApiPropertyOptional({
    description: 'The status of request',
    example: 200
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly status: number;

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
