import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';
import { Request } from 'src/requests/schemas/request.schema';

import { Subdivision } from './schemas/subdivision.schema';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { UpdateSubdivisionDto } from './dto/update-subdivision.dto';

@Injectable()
export class SubdivisionsService {
  constructor(
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<Subdivision>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>
  ) {}

  async create(createSubdivisionDto: CreateSubdivisionDto): Promise<Subdivision> {
    try {
      return await this.subdivisionModel.create(createSubdivisionDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('Запис із такою назвою вже існує');
      }
      throw error;
    }
  }

  async findAll(): Promise<Subdivision[]> {
    return await this.subdivisionModel.find().exec();
  }

  async findAllByOrganizationId(id: string): Promise<Subdivision[]> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    return await this.subdivisionModel
      .find({ organization: id }, null, {
        autopopulate: false
      })
      .exec();
  }

  async findOneById(id: string): Promise<Subdivision> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const subdivision = await this.subdivisionModel.findById(id).exec();
    if (!subdivision) {
      throw new NotFoundException('Запис не знайдено');
    }
    return subdivision;
  }

  async updateOneById(
    id: string,
    updateSubdivisionDto: UpdateSubdivisionDto
  ): Promise<Subdivision> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    try {
      const updatedSubdivision = await this.subdivisionModel
        .findByIdAndUpdate(id, { $set: updateSubdivisionDto }, { new: true })
        .exec();
      if (!updatedSubdivision) {
        throw new NotFoundException('Запис не знайдено');
      }
      return updatedSubdivision;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('Запис із такою назвою вже існує');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Subdivision> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const deletedSubdivision = await this.subdivisionModel.findByIdAndRemove(id).exec();

    if (!deletedSubdivision) {
      throw new NotFoundException('Запис не знайдено');
    }

    await this.ipaddressModel.updateMany(
      { subdivision: deletedSubdivision.id },
      { $set: { subdivision: null } }
    );
    await this.mailboxModel.updateMany(
      { subdivision: deletedSubdivision.id },
      { $set: { subdivision: null } }
    );
    await this.requestModel.updateMany(
      { subdivision: deletedSubdivision.id },
      { $set: { subdivision: null } }
    );

    return deletedSubdivision;
  }
}
