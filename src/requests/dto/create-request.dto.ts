import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIP, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Full name of the requester', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '12-34-567' })
  @IsString()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP Address of the requester', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsOptional()
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Incoming request number of the requester',
    example: '№125987/01'
  })
  @IsString()
  @IsOptional()
  readonly reqnum: string;

  @ApiProperty({ description: 'Request message', example: 'Please fix the issue' })
  @IsString()
  readonly request: string;

  @ApiPropertyOptional({ description: 'Comment about the request', example: 'Fixed the issue' })
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Conclusion about the request', example: 'Issue resolved' })
  @IsString()
  @IsOptional()
  readonly conclusion: string;

  @ApiProperty({
    description: 'ID of the associated User',
    example: '6299f5cebf44864bfcea39fa'
  })
  @IsString()
  @IsMongoId()
  readonly workerOpen: string;

  @ApiPropertyOptional({
    description: 'ID of the associated User',
    example: '6299f5cebf44864bfcea39fa'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly workerClose: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Location',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Organization',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly organization: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Subdivision',
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly subdivision: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Department',
    example: '6299b5cebf44864bfcea3772'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly department: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Position',
    example: '6299b5cebf44864bfcea391a'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly position: string;
}
