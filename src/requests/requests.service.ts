import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginateModel } from 'mongoose';

import { NoticeStatusType, RequestStatusType } from 'src/common/enums/status.enum';
import { BaseCrudService } from 'src/common/services/base.service';
import type { JwtPayload } from 'src/common/types/jwt-payload.type';
import { NoticesService } from 'src/notices/notices.service';

import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { RequestEntity } from './entities/request.entity';
import { Request, RequestDocument } from './models/request.schema';

@Injectable()
export class RequestsService extends BaseCrudService<
  RequestDocument,
  RequestEntity,
  CreateRequestInput,
  UpdateRequestInput
> {
  constructor(
    @InjectModel(Request.name) private readonly requestModel: PaginateModel<RequestDocument>,
    private readonly noticesService: NoticesService
  ) {
    super(requestModel);
  }

  private async sendNotice(doc: RequestEntity, title: string, status: NoticeStatusType) {
    const message = [
      `Від: ${doc.fullname}`,
      `Тел: ${doc.phone}`,
      `Запит: ${doc.request}`,
      doc.conclusion && `Висновок: ${doc.conclusion}`,
      `Статус: ${doc.status ? '✅ Виконано' : '⏳ В роботі'}`
    ]
      .filter(Boolean)
      .join('\n');

    await this.noticesService.createOneByUser('request', status, title, message);
  }

  async createOpened(user: JwtPayload, input: CreateRequestInput): Promise<RequestEntity> {
    const result = await super.create({ ...input, opened: user.id });
    void this.sendNotice(result, 'Нова заявка', NoticeStatusType.SUCCESS);
    return result;
  }

  async updateOneOrClosedById(
    user: JwtPayload,
    id: string,
    input: UpdateRequestInput
  ): Promise<RequestEntity> {
    const result = await super.updateOneById(
      id,
      input.status === RequestStatusType.CLOSED ? { ...input, closed: user.id } : input
    );
    void this.sendNotice(result, 'Оновлення заявки', NoticeStatusType.SUCCESS);
    return result;
  }

  override async removeOneById(id: string): Promise<RequestEntity> {
    const result = await super.removeOneById(id);
    void this.sendNotice(result, 'Видалення заявки', NoticeStatusType.WARN);
    return result;
  }
}
