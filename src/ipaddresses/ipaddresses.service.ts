import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult, Model, Types } from 'mongoose';
import { isIP } from 'class-validator';
import { Netmask } from 'netmask';

import { MailerService } from 'src/mailer/mailer.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Scope } from 'src/common/enums/scope.enum';
import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';
import { Inspector } from 'src/inspectors/schemas/inspector.schema';

import { Ipaddress } from './schemas/ipaddress.schema';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';

@Injectable()
export class IpaddressesService {
  constructor(
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: PaginateModel<Ipaddress>,
    @InjectModel(Inspector.name) private readonly inspectorModel: Model<Inspector>,
    private readonly mailerService: MailerService,
    private readonly profilesService: ProfilesService
  ) {}

  async create(createIpaddressDto: CreateIpaddressDto): Promise<Ipaddress> {
    const { ipaddress } = createIpaddressDto;

    const indexip = new Netmask(ipaddress).netLong;

    const newIpaddress = await this.ipaddressModel.create({ ...createIpaddressDto, indexip });

    const emails = await this.profilesService.findEmailsIsNotice(Scope.IpaddressNotice);

    this.mailerService.sendIPAddress(emails, newIpaddress, 'Adding IP Addresses');

    return newIpaddress;
  }

  async findAll(query: PaginateQueryDto): Promise<PaginateResult<Ipaddress>> {
    const { offset = 0, limit = 5, sort = { indexip: 1 }, filters = {} } = query;

    if (filters?.internet) {
      switch (filters?.internet['$regex']) {
        case '^opened$':
          filters['internet.dateOpen'] = { $ne: null };
          filters['internet.dateClose'] = null;
          break;
        case '^closed$':
          filters['internet.dateOpen'] = { $ne: null };
          filters['internet.dateClose'] = { $ne: null };
          break;
        case '^missing$':
          filters['internet'] = { $ne: null };
          filters['internet.mail'] = null;
          filters['internet.dateOpen'] = null;
          filters['internet.dateClose'] = null;
          break;
      }
      delete filters.internet;
    }

    return await this.ipaddressModel.paginate(
      { ...filters },
      {
        sort,
        offset,
        limit,
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findOneById(
    id: string,
    populate: boolean = false,
    aggregate: boolean = false
  ): Promise<Ipaddress | any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const ipaddress = await this.ipaddressModel.findById(id, null, {
      autopopulate: populate
    });

    if (!ipaddress) {
      throw new NotFoundException('Record not found');
    }

    if (!aggregate) return ipaddress;
    const inspector = await this.inspectorModel
      .findOne({ host: ipaddress.ipaddress }, null, {
        autopopulate: populate
      })
      .exec();
    return { ipaddress, inspector };
  }

  async findOneByIP(
    ip: string,
    populate: boolean = false,
    aggregate: boolean = false
  ): Promise<Ipaddress | any> {
    if (!isIP(ip)) {
      throw new BadRequestException('Invalid field value');
    }
    const ipaddress = await this.ipaddressModel
      .findOne({ ipaddress: ip }, null, {
        autopopulate: populate
      })
      .exec();
    if (!ipaddress) {
      throw new NotFoundException('Record not found');
    }
    if (!aggregate) return ipaddress;
    const inspector = await this.inspectorModel
      .findOne({ host: ipaddress.ipaddress }, null, {
        autopopulate: populate
      })
      .exec();
    return { ipaddress, inspector };
  }

  async updateOneById(id: string, updateIpaddressDto: UpdateIpaddressDto): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }
    const { ipaddress } = updateIpaddressDto;
    const indexip = new Netmask(ipaddress).netLong;
    const updatedIpaddress = await this.ipaddressModel
      .findByIdAndUpdate(id, { $set: { ...updateIpaddressDto, indexip } }, { new: true })
      .exec();
    if (!updatedIpaddress) {
      throw new NotFoundException('Record not found');
    }
    return updatedIpaddress;
  }

  async removeOneById(id: string): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid record ID');
    }

    const ipaddress = await this.ipaddressModel.findById(id);

    const deletedIpaddress = await this.ipaddressModel.findByIdAndRemove(id).exec();

    if (!deletedIpaddress) {
      throw new NotFoundException('Record not found');
    }

    const emails = await this.profilesService.findEmailsIsNotice(Scope.IpaddressNotice);

    this.mailerService.sendIPAddress(emails, ipaddress, 'Deleting IP Addresses');

    return deletedIpaddress;
  }
}
