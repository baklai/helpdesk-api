import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NoticesModule } from 'src/notices/notices.module';

import { ChannelsResolver } from './channels.resolver';
import { ChannelsService } from './channels.service';
import { Channel, ChannelSchema } from './models/channel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    NoticesModule
  ],
  providers: [ChannelsResolver, ChannelsService],
  exports: [ChannelsService]
})
export class ChannelsModule {}
