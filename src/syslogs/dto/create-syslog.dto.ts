import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSyslogDto {
  @ApiPropertyOptional({
    description: 'The IP of request',
    example: '127.0.0.1'
  })
  @IsString()
  @IsOptional()
  readonly host: string;

  @ApiPropertyOptional({
    description: 'The ID of Profile',
    example: '6299b5cebf44864bfcea36d4'
  })
  @IsString()
  @IsOptional()
  readonly profile: string;

  @ApiPropertyOptional({
    description: 'The params of request',
    example: '{"0":"profiles"}'
  })
  @IsString()
  @IsOptional()
  readonly params: string;

  @ApiPropertyOptional({
    description: 'The query of request',
    example: '{"limit":"10","offset":"50"}'
  })
  @IsString()
  @IsOptional()
  readonly query: string;

  @ApiPropertyOptional({
    description: 'The body of request',
    example: '{"name":"Cisco unit"}'
  })
  @IsString()
  @IsOptional()
  readonly body: string;

  @ApiPropertyOptional({
    description: 'The method of request',
    example: 'POST'
  })
  @IsString()
  @IsOptional()
  readonly method: string;

  @ApiPropertyOptional({
    description: 'The base url of request',
    example: '/units?limit=10&offset=50'
  })
  @IsString()
  @IsOptional()
  readonly baseUrl: string;

  @ApiPropertyOptional({
    description: 'The status of request',
    example: 200
  })
  @IsNumber()
  @IsOptional()
  readonly status: number;

  @ApiPropertyOptional({
    description: 'The user-agent of request',
    example: 200
  })
  @IsString()
  @IsOptional()
  readonly userAgent: string;
}
