import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'Творець звіту',
    example: 'John Doe'
  })
  @IsString()
  readonly creator: string;

  @ApiProperty({
    description: 'Назва звіту',
    example: 'Старший інженер-програміст'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Опис звіту',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description: 'Збір даних звіту',
    example: 'Senior Software Engineer'
  })
  @IsString()
  readonly datacollection: string;

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
