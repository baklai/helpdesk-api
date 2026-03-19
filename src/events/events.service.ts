import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';

import { CreateEventInput } from './dto/create-event.input';
import { EventArgs } from './dto/event.args';
import { UpdateEventInput } from './dto/update-event.input';
import { EventEntity } from './entities/event.entity';
import { Event, EventDocument } from './models/event.schema';

@Injectable()
export class EventsService extends BaseCrudService<
  EventDocument,
  EventEntity,
  CreateEventInput,
  UpdateEventInput
> {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<EventDocument>) {
    super(eventModel);
  }

  async findAllByDateRange(args: EventArgs): Promise<EventEntity[]> {
    const { startDateTime, endDateTime } = args;

    return this.eventModel
      .find({ startDateTime: { $gte: startDateTime }, endDateTime: { $lt: endDateTime } })
      .exec() as Promise<EventEntity[]>;
  }
}
