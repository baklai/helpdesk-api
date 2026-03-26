import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PubSubProvider } from 'src/common/subscriptions/pubsub.provider';
import { User, UserSchema } from 'src/users/models/user.schema';

import { Notice, NoticeSchema } from './models/notice.schema';
import { NoticesResolver } from './notices.resolver';
import { NoticesService } from './notices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [NoticesResolver, NoticesService, PubSubProvider],
  exports: [NoticesService]
})
export class NoticesModule {}
