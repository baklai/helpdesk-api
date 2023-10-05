import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EnterpriseDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the enterprise (must be unique)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the enterprise',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the enterprise',
    example: 'A cutting-edge technology company specializing in software solutions.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

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
