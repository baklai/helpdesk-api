import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChannelDto {
  @ApiProperty({
    description: 'The ID of the record (unique)',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'The location from', example: 'Headquarters' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly locationFrom: string;

  @ApiProperty({ description: 'The unit from', example: 'Router TP-Link' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly unitFrom: string;

  @ApiProperty({ description: 'The location to', example: 'Branch Office' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly locationTo: string;

  @ApiProperty({ description: 'The unit to', example: 'Switch' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly unitTo: string;

  @ApiProperty({ description: 'The level of channel', example: 'High' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly level: string;

  @ApiProperty({ description: 'The type of channel', example: 'Fiber Optic' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ description: 'The speed of channel', example: '10 Gbps' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly speed: string;

  @ApiProperty({ description: 'The status of channel', example: 'Active' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({ description: 'The operator of channel', example: 'ISP' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly operator: string;

  @ApiProperty({ description: 'The composition of channel', example: 'Single-mode' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly composition: string;

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
