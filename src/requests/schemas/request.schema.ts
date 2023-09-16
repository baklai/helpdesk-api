import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { Position } from 'src/positions/schemas/position.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Branch } from 'src/branches/schemas/branch.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Department } from 'src/departments/schemas/department.schema';

export type RequestDocument = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop({ type: String, required: true, trim: true })
  fullname: string;

  @Prop({ type: String, required: true, trim: true })
  phone: string;

  @Prop({ type: String, trim: true })
  ipaddress: string;

  @Prop({ type: String, trim: true })
  reqnum: string;

  @Prop({ type: String, required: true, trim: true })
  request: string;

  @Prop({ type: Boolean, default: false })
  closed: boolean;

  @Prop({ type: String, trim: true })
  comment: string;

  @Prop({ type: String, trim: true })
  conclusion: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  })
  workerOpen: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  })
  workerClose: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    trim: true,
    autopopulate: true
  })
  position: Position;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    trim: true,
    autopopulate: true
  })
  location: Location;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    trim: true,
    autopopulate: true
  })
  company: Company;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    trim: true,
    autopopulate: true
  })
  branch: Branch;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    trim: true,
    autopopulate: true
  })
  enterprise: Enterprise;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    trim: true,
    autopopulate: true
  })
  department: Department;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
