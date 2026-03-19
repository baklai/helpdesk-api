import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'src/common/services/base.service';
import { Ipaddress, IpaddressDocument } from 'src/ipaddresses/models/ipaddress.schema';
import { Mailbox, MailboxDocument } from 'src/mailboxes/models/mailbox.schema';
import { Request, RequestDocument } from 'src/requests/models/request.schema';

import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { DepartmentEntity } from './entities/department.entity';
import { Department, DepartmentDocument } from './models/department.schema';

@Injectable()
export class DepartmentsService extends BaseCrudService<
  DepartmentDocument,
  DepartmentEntity,
  CreateDepartmentInput,
  UpdateDepartmentInput
> {
  constructor(
    @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel(Ipaddress.name) private readonly ipaddressModel: Model<IpaddressDocument>,
    @InjectModel(Mailbox.name) private readonly mailboxModel: Model<MailboxDocument>,
    @InjectModel(Request.name) private readonly requestModel: Model<RequestDocument>
  ) {
    super(departmentModel);
  }

  override async removeOneById(id: string): Promise<DepartmentEntity> {
    const result = await super.removeOneById(id);

    await this.ipaddressModel.updateMany({ department: result.id }, { $set: { department: null } });
    await this.mailboxModel.updateMany({ department: result.id }, { $set: { department: null } });
    await this.requestModel.updateMany({ department: result.id }, { $set: { department: null } });

    return result;
  }
}
