import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, PaginateModel, PaginateResult } from 'mongoose';
import { Netmask } from 'netmask';

import { PaginateQueryDto } from 'src/common/dto/paginate-query.dto';

import { Ipaddress } from './schemas/ipaddress.schema';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';

@Injectable()
export class IpaddressesService {
  constructor(
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: PaginateModel<Ipaddress>
  ) {}

  async create(createIpaddressDto: CreateIpaddressDto): Promise<Ipaddress> {
    const { ipaddress } = createIpaddressDto;
    const indexip = new Netmask(ipaddress).netLong;
    return await this.ipaddressModel.create({ ...createIpaddressDto, indexip });
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
        limit: Number(limit) > 0 ? Number(limit) : await this.ipaddressModel.countDocuments(),
        lean: false,
        allowDiskUse: true
      }
    );
  }

  async findOneById(id: string, populate: boolean): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ipaddress ID');
    }
    const ipaddress = await this.ipaddressModel
      .findById(id, null, {
        autopopulate: populate
      })
      .exec();
    if (!ipaddress) {
      throw new NotFoundException('Ipaddress not found');
    }
    return ipaddress;
  }

  async findOneByIP(ip: string, populate: boolean): Promise<Ipaddress> {
    const ipaddress = await this.ipaddressModel
      .findOne({ ipaddress: ip }, null, {
        autopopulate: populate
      })
      .exec();
    if (!ipaddress) {
      throw new NotFoundException('Ipaddress not found');
    }
    return ipaddress;
  }

  async updateOneById(id: string, updateIpaddressDto: UpdateIpaddressDto): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ipaddress ID');
    }
    const { ipaddress } = updateIpaddressDto;
    const indexip = new Netmask(ipaddress).netLong;
    const updatedIpaddress = await this.ipaddressModel
      .findByIdAndUpdate(id, { $set: { ...updateIpaddressDto, indexip } }, { new: true })
      .exec();
    if (!updatedIpaddress) {
      throw new NotFoundException('Ipaddress not found');
    }
    return updatedIpaddress;
  }

  async removeOneById(id: string): Promise<Ipaddress> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ipaddress ID');
    }
    const deletedIpaddress = await this.ipaddressModel.findByIdAndRemove(id).exec();
    if (!deletedIpaddress) {
      throw new NotFoundException('Ipaddress not found');
    }
    return deletedIpaddress;
  }
}
