import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class TokensDto {
  @ApiProperty({
    description: 'Access JWT Token. JWTs are credentials, which can grant access to resources.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({
    description: 'Refresh JWT Token. JWTs are credentials, which can grant access to resources.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly refreshToken: string;
}
