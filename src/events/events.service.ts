import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = await this.eventModel.create(createEventDto);
    return createdEvent;
  }

  async findAll(query: QueryEventDto): Promise<Event[]> {
    const { startDate, endDate } = query;
    return await this.eventModel.find({ datetime: { $gte: startDate, $lt: endDate } }).exec();
  }

  async findOneById(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid event ID');
    }
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async updateOneById(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid event ID');
    }
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, { $set: updateEventDto }, { new: true })
      .exec();
    if (!updatedEvent) {
      throw new NotFoundException('Event not found');
    }
    return updatedEvent;
  }

  async removeOneById(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid event ID');
    }
    const deletedEvent = await this.eventModel.findByIdAndRemove(id).exec();
    if (!deletedEvent) {
      throw new NotFoundException('Event not found');
    }
    return deletedEvent;
  }
}
