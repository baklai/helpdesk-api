import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompanyDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the company (must be unique)',
    example: 'ABC Corporation'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the company',
    example: '456 Business Avenue, Townsville'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the company',
    example: 'A leading provider of innovative solutions.'
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
