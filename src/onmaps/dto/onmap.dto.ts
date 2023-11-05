import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsIP, IsMongoId, IsOptional, IsString } from 'class-validator';

export class OnmapDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ description: 'The host address', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  readonly host: string;

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
