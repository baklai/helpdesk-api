import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsIP,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Full name of the requester', example: 'John Doe' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '12-34-567' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly phone: string;

  @ApiPropertyOptional({ description: 'IP Address of the requester', example: '192.168.1.1' })
  @IsIP()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly ipaddress: string;

  @ApiPropertyOptional({
    description: 'Incoming request number of the requester',
    example: '№125987/01'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly reqnum: string;

  @ApiProperty({ description: 'Request message', example: 'Please fix the issue' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly request: string;

  @ApiPropertyOptional({ description: 'Comment about the request', example: 'Fixed the issue' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({ description: 'Conclusion about the request', example: 'Issue resolved' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly conclusion: string;

  @ApiProperty({
    description: 'ID of the associated User',
    example: '6299f5cebf44864bfcea39fa'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  readonly workerOpen: string;

  @ApiPropertyOptional({
    description: 'ID of the associated User',
    example: '6299f5cebf44864bfcea39fa'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly workerClose: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Location',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Company',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly company: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Branch',
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly branch: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Enterprise',
    example: '6299b5cebf44864bfcea372a'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly enterprise: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Department',
    example: '6299b5cebf44864bfcea3772'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly department: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Position',
    example: '6299b5cebf44864bfcea391a'
  })
  @IsString()
  @IsMongoId()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  readonly position: string;
}
