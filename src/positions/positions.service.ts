import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';
import { Request } from 'src/requests/schemas/request.schema';

import { Position } from './schemas/position.schema';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position.name) private readonly positionModel: Model<Position>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    try {
      return await this.positionModel.create(createPositionDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('Посада з такою назвою вже існує');
      }
      throw error;
    }
  }

  async findAll(): Promise<Position[]> {
    return await this.positionModel.find().select({ createdAt: 0, updatedAt: 0 }).exec();
  }

  async findOneById(id: string): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const position = await this.positionModel.findById(id).exec();
    if (!position) {
      throw new NotFoundException('Запис не знайдено');
    }
    return position;
  }

  async updateOneById(id: string, updatePositionDto: UpdatePositionDto): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    try {
      const updatedPosition = await this.positionModel
        .findByIdAndUpdate(id, { $set: updatePositionDto }, { new: true })
        .exec();
      if (!updatedPosition) {
        throw new NotFoundException('Запис не знайдено');
      }
      return updatedPosition;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('Посада з такою назвою вже існує');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Position> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const deletedPosition = await this.positionModel.findByIdAndRemove(id).exec();

    if (!deletedPosition) {
      throw new NotFoundException('Запис не знайдено');
    }

    await this.ipaddressModel.updateMany(
      { position: deletedPosition.id },
      { $set: { position: null } }
    );
    await this.mailboxModel.updateMany(
      { position: deletedPosition.id },
      { $set: { position: null } }
    );
    await this.requestModel.updateMany(
      { position: deletedPosition.id },
      { $set: { position: null } }
    );

    return deletedPosition;
  }
}
