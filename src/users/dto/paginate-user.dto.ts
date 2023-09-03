import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { PaginateV2ResponseDto } from 'src/common/dto/paginate-response.dto';

export class PaginateUserDto extends PaginateV2ResponseDto {
  @ApiProperty({ type: [UserDto], description: 'Array of documents' })
  docs?: UserDto[];
}
