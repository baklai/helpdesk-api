import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { MongoSchemaDto } from 'src/common/dto/mongosee-schema.dto';

export class ChannelDto extends MongoSchemaDto {
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
}
