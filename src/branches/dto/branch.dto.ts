import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BranchDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the branch (must be unique)',
    example: 'Downtown Branch'
  })
  @IsString()
  @IsDefined({ message: 'Branch name must be defined' })
  @IsNotEmpty({ message: 'Branch name not be empty' })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The address of the branch',
    example: '123 Main Street, Cityville'
  })
  @IsString()
  @IsOptional()
  readonly address?: string;

  @ApiPropertyOptional({
    description: 'A description about the branch',
    example: 'This branch is located in the heart of the city.'
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'The created date of the record',
    example: '2021-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the record',
    example: '2022-06-03T07:18:38.233Z'
  })
  @IsDate()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt?: Date;
}
