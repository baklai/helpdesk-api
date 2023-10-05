import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LocationDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    description: 'The name of the location (must be unique)',
    example: 'Headquarters'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The region of the location',
    example: 'North America'
  })
  @IsString()
  @IsOptional()
  readonly region: string;

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
