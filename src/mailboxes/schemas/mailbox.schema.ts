import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Location } from 'src/locations/schemas/location.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Branch } from 'src/branches/schemas/branch.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Position } from 'src/positions/schemas/position.schema';

export type MailboxDocument = HydratedDocument<Mailbox>;

@Schema()
export class Mailbox {
  @Prop({ type: String, required: true, trim: true })
  reqnum: string;

  @Prop({ type: String, required: true, trim: true })
  login: string;

  @Prop({ type: Date, required: true, trim: true })
  dateOpen: Date;

  @Prop({ type: String, trim: true })
  fullname: string;

  @Prop({ type: String, trim: true })
  phone: string;

  @Prop({ type: String, trim: true })
  ipaddress: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    trim: true,
    default: null,
    autopopulate: true
  })
  location: Location;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    trim: true,
    default: null,
    autopopulate: true
  })
  company: Company;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    trim: true,
    default: null,
    autopopulate: true
  })
  branch: Branch;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    trim: true,
    default: null,
    autopopulate: true
  })
  enterprise: Enterprise;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    trim: true,
    default: null,
    autopopulate: true
  })
  department: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    trim: true,
    default: null,
    autopopulate: true
  })
  position: Position;

  @Prop({ type: Date, trim: true })
  dateClose: Date;

  @Prop({ type: String, trim: true })
  comment: string;
}

export const MailboxSchema = SchemaFactory.createForClass(Mailbox);

MailboxSchema.virtual('status').get(function () {
  if (this?.dateOpen && !this?.dateClose) return true;
  return false;
});
