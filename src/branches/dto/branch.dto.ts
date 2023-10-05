import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BranchDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the branch (must be unique)',
    example: 'Downtown Branch'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the branch',
    example: '123 Main Street, Cityville'
  })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiPropertyOptional({
    description: 'A description about the branch',
    example: 'This branch is located in the heart of the city.'
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
