import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateSubdivisionDto {
  @ApiPropertyOptional({
    description: 'The code of the subdivision',
    example: 'TSInc'
  })
  @IsString()
  @IsOptional()
  readonly code: string;

  @ApiProperty({
    description: 'The name of the subdivision (must be unique)',
    example: 'Tech Solutions Inc.'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the subdivision',
    example: '123 Tech Street, Innovation City'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the subdivision',
    example: 'A cutting-edge technology subdivision specializing in software solutions.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description: 'ID of the associated Organization',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly organization: string;
}
