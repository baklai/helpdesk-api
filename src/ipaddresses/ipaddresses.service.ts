import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isIP } from 'class-validator';
import type { PaginateModel, PaginateResult } from 'mongoose';
import { Netmask } from 'netmask';

import { PaginateArgs } from 'src/common/dto/paginate.args';
import { NoticeStatusType } from 'src/common/enums/status.enum';
import { BaseCrudService } from 'src/common/services/base.service';
import { NoticesService } from 'src/notices/notices.service';

import { CreateIpaddressInput } from './dto/create-ipaddress.input';
import { UpdateIpaddressInput } from './dto/update-ipaddress.input';
import { IpaddressEntity } from './entities/ipaddress.entity';
import { Ipaddress, IpaddressDocument } from './models/ipaddress.schema';

@Injectable()
export class IpaddressesService extends BaseCrudService<
  IpaddressDocument,
  IpaddressEntity,
  CreateIpaddressInput,
  UpdateIpaddressInput
> {
  constructor(
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: PaginateModel<IpaddressDocument>,
    private readonly noticesService: NoticesService
  ) {
    super(ipaddressModel);
  }

  private async sendNotice(doc: IpaddressEntity, title: string, status: NoticeStatusType) {
    const message = [
      doc.ipaddress && `IP-адреса: ${doc.ipaddress}`,
      doc.reqnum && `Номер листа: ${doc.reqnum}`,
      doc.fullname && `Прізвище та ім'я: ${doc.fullname}`,
      doc.email && `Електронна пошта: ${doc.email}`,
      doc.phone && `Номер телефону: ${doc.phone}`
    ]
      .filter(Boolean)
      .join('\n');

    await this.noticesService.createOneByUser('ipaddress', status, title, message);
  }

  override async create(input: CreateIpaddressInput): Promise<IpaddressEntity> {
    const { ipaddress } = input;

    if (!isIP(ipaddress)) {
      throw new BadRequestException('Недійсний формат IPv4-адреси');
    }

    const indexip = new Netmask(ipaddress).netLong;
    const result = await super.create({ ...input, indexip } as unknown as CreateIpaddressInput);

    void this.sendNotice(result, 'Створення IP-адреси', NoticeStatusType.SUCCESS);

    return result;
  }

  override async findAllPaginated(args: PaginateArgs): Promise<PaginateResult<IpaddressEntity>> {
    return super.findAllPaginated({
      ...args,
      sort: args.sort ?? { indexip: 1 },
      filters: args.filters
    });
  }

  override async updateOneById(id: string, input: UpdateIpaddressInput): Promise<IpaddressEntity> {
    const { ipaddress } = input;

    if (!ipaddress || !isIP(ipaddress)) {
      throw new BadRequestException('Недійсний формат IPv4-адреси');
    }

    const indexip = new Netmask(ipaddress).netLong;
    const result = await super.updateOneById(id, {
      ...input,
      indexip
    } as unknown as UpdateIpaddressInput);

    void this.sendNotice(result, 'Оновлення IP-адреси', NoticeStatusType.INFO);

    return result;
  }

  override async removeOneById(id: string): Promise<IpaddressEntity> {
    const result = await super.removeOneById(id);
    void this.sendNotice(result, 'Видалення IP-адреси', NoticeStatusType.WARN);
    return result;
  }

  async findOneByIP(ip: string): Promise<IpaddressEntity> {
    if (!isIP(ip)) {
      throw new BadRequestException('Недійсний формат IP-адреси');
    }

    const ipaddress = await this.ipaddressModel.findOne({ ipaddress: ip }).exec();

    if (!ipaddress) {
      throw new NotFoundException(`Запис для IP ${ip} не знайдено`);
    }

    return ipaddress as unknown as IpaddressEntity;
  }
}
