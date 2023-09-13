import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SyslogDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id?: string;

  @ApiPropertyOptional({
    description: 'The name of the position (must be unique)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsDefined({ message: 'Position name must be defined' })
  @IsNotEmpty({ message: 'Position name not be empty' })
  readonly method?: string;

  @ApiPropertyOptional({
    description: 'The name of the position (must be unique)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsDefined({ message: 'Position name must be defined' })
  @IsNotEmpty({ message: 'Position name not be empty' })
  readonly url?: string;

  @ApiPropertyOptional({
    description: 'The name of the position (must be unique)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsDefined({ message: 'Position name must be defined' })
  @IsNotEmpty({ message: 'Position name not be empty' })
  readonly status?: number;

  @ApiPropertyOptional({
    description: 'The name of the position (must be unique)',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsDefined({ message: 'Position name must be defined' })
  @IsNotEmpty({ message: 'Position name not be empty' })
  readonly payload?: string;

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
