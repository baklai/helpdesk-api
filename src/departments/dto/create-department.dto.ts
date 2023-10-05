import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'The name of the department (must be unique)',
    example: 'Sales Department'
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'The description of the department',
    example: 'Responsible for driving sales and customer engagement.'
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
