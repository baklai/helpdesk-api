import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Request, RequestSchema } from 'src/requests/schemas/request.schema';
import { Notice, NoticeSchema } from 'src/notices/schemas/notice.schema';

import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Notice.name, schema: NoticeSchema }
    ])
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService]
})
export class ProfilesModule {}
