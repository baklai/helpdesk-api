import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsIP, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSyslogDto {
  @ApiPropertyOptional({
    description: 'The IP of request',
    example: '127.0.0.1'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly ip: string;

  @ApiPropertyOptional({
    description: 'The ID of User',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly user: string;

  @ApiPropertyOptional({
    description: 'The params of request',
    example: '{"0":"users"}'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly params: string;

  @ApiPropertyOptional({
    description: 'The query of request',
    example: '{"limit":"10","offset":"50"}'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly query: string;

  @ApiPropertyOptional({
    description: 'The body of request',
    example: '{"name":"Cisco unit"}'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly body: string;

  @ApiPropertyOptional({
    description: 'The method of request',
    example: 'POST'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly method: string;

  @ApiPropertyOptional({
    description: 'The base url of request',
    example: '/units?limit=10&offset=50'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly baseUrl: string;

  @ApiPropertyOptional({
    description: 'The status of request',
    example: 200
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly status: number;

  @ApiPropertyOptional({
    description: 'The user-agent of request',
    example: 200
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly userAgent: string;
}
