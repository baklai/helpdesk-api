import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMailboxDto {
  @ApiProperty({
    description: 'Incoming letter number',
    example: 'Letter number №548925 from 12/12/2023'
  })
  @IsString()
  readonly reqnum: string;

  @ApiProperty({ description: 'E-Mail login', example: 'john.doe1985' })
  @IsString()
  readonly login: string;

  @ApiProperty({ description: 'Fullname of email owner', example: 'John Doe' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'Client phone number', example: '1234-56-78' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'Date when email was opened', example: new Date() })
  @IsDate()
  readonly dateOpen: Date;

  @ApiPropertyOptional({ description: 'Date when email was closed', example: new Date() })
  @IsDate()
  @IsOptional()
  readonly dateClose: Date;

  @ApiPropertyOptional({
    description: 'Comment about email',
    example: 'This user has several mailboxes'
  })
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Location',
    example: '6299b5cebf44864bfcea39da'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly location: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Company',
    example: '6299b5cfbf44864bfcea3b0e'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly company: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Branch',
    example: '6299b5cebf44864bfcea36d2'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly branch: string;

  @ApiPropertyOptional({
    description: 'ID of the associated Enterprise',
    example: '6299b5cebf44864bfcea372a'
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly enterprise: string;

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
