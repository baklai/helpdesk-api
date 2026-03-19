import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';
import { Event, EventSchema } from './models/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  providers: [EventsResolver, EventsService],
  exports: [EventsService]
})
export class EventsModule {}
