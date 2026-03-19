import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Notice, NoticeSchema } from 'src/notices/models/notice.schema';
import { NoticesModule } from 'src/notices/notices.module';
import { Request, RequestSchema } from 'src/requests/models/request.schema';

import { User, UserSchema } from './models/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Notice.name, schema: NoticeSchema }
    ]),
    NoticesModule
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
