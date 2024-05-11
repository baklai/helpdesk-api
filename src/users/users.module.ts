import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Request, RequestSchema } from 'src/requests/schemas/request.schema';
import { Notice, NoticeSchema } from 'src/notices/schemas/notice.schema';

import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Notice.name, schema: NoticeSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
