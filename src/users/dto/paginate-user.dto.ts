import { ApiProperty } from '@nestjs/swagger';

import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

import { UserDto } from './user.dto';

export class PaginateUserDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [UserDto], description: 'Array of documents' })
  docs?: UserDto[];
}
