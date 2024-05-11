import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Syslog, SyslogSchema } from 'src/syslogs/schemas/syslog.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

import { Notice, NoticeSchema } from './schemas/notice.schema';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
      { name: Syslog.name, schema: SyslogSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [NoticesController],
  providers: [NoticesService]
})
export class NoticesModule {}
