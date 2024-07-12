import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'The creator of the report',
    example: 'John Doe'
  })
  @IsString()
  readonly creator: string;

  @ApiProperty({
    description: 'The name of the report',
    example: 'Senior Software Engineer'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The description of the report',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description: 'The collection of the report',
    example: 'Senior Software Engineer'
  })
  @IsString()
  readonly collection: string;

  @ApiPropertyOptional({
    description: 'The fields of the report',
    example: '{"unit":"Unit name"}'
  })
  @IsString()
  @IsOptional()
  readonly fields: string;

  @ApiPropertyOptional({
    description: 'The sort of the report',
    example: '{"reqnum":1,"name":-1}'
  })
  @IsString()
  @IsOptional()
  readonly sorts: string;

  @ApiPropertyOptional({
    description: 'The filters of the report',
    example: '{"unit":{"$in":[]}}'
  })
  @IsString()
  @IsOptional()
  readonly filters: string;
}
