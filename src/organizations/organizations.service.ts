import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Subdivision } from 'src/subdivisions/schemas/subdivision.schema';
import { Ipaddress } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Mailbox } from 'src/mailboxes/schemas/mailbox.schema';
import { Request } from 'src/requests/schemas/request.schema';

import { Organization } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name) private readonly organizationModel: Model<Organization>,
    @InjectModel(Subdivision.name) private readonly subdivisionModel: Model<Subdivision>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<Ipaddress>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<Mailbox>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    try {
      return await this.organizationModel.create(createOrganizationDto);
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('Організація з такою назвою вже існує');
      }
      throw error;
    }
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationModel.find().exec();
  }

  async findOneById(id: string): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization) {
      throw new NotFoundException('Запис не знайдено');
    }
    return organization;
  }

  async updateOneById(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto
  ): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }
    try {
      const updatedOrganization = await this.organizationModel
        .findByIdAndUpdate(id, { $set: updateOrganizationDto }, { new: true })
        .exec();
      if (!updatedOrganization) {
        throw new NotFoundException('Запис не знайдено');
      }
      return updatedOrganization;
    } catch (error) {
      if (error.code === 11000 && error?.keyPattern && error?.keyPattern.name) {
        throw new ConflictException('Запис із такою назвою вже існує');
      }
      throw error;
    }
  }

  async removeOneById(id: string): Promise<Organization> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор запису');
    }

    const deletedOrganization = await this.organizationModel.findByIdAndRemove(id).exec();

    if (!deletedOrganization) {
      throw new NotFoundException('Запис не знайдено');
    }

    await this.subdivisionModel.deleteMany({ organization: deletedOrganization.id });

    await this.ipaddressModel.updateMany(
      { organization: deletedOrganization.id },
      { $set: { organization: null, subdivision: null } }
    );
    await this.mailboxModel.updateMany(
      { organization: deletedOrganization.id },
      { $set: { organization: null, subdivision: null } }
    );
    await this.requestModel.updateMany(
      { organization: deletedOrganization.id },
      { $set: { organization: null, subdivision: null } }
    );

    return deletedOrganization;
  }
}
