import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Netmask } from 'netmask';

import { Unit } from '../../units/schemas/unit.schema';
import { Location } from '../../locations/schemas/location.schema';
import { Company } from '../../companies/schemas/company.schema';
import { Branch } from 'src/branches/schemas/branch.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Position } from '../../positions/schemas/position.schema';

const CIDR_LIST = [
  { value: 32, mask: '255.255.255.255' },
  { value: 31, mask: '255.255.255.254' },
  { value: 30, mask: '255.255.255.252' },
  { value: 29, mask: '255.255.255.248' },
  { value: 28, mask: '255.255.255.240' },
  { value: 27, mask: '255.255.255.224' },
  { value: 26, mask: '255.255.255.192' },
  { value: 25, mask: '255.255.255.128' },
  { value: 24, mask: '255.255.255.0' },
  { value: 23, mask: '255.255.254.0' },
  { value: 22, mask: '255.255.252.0' },
  { value: 21, mask: '255.255.248.0' },
  { value: 20, mask: '255.255.240.0' },
  { value: 19, mask: '255.255.224.0' },
  { value: 18, mask: '255.255.192.0' },
  { value: 17, mask: '255.255.128.0' },
  { value: 16, mask: '255.255.0.0' },
  { value: 15, mask: '255.254.0.0' },
  { value: 14, mask: '255.252.0.0' },
  { value: 13, mask: '255.248.0.0' },
  { value: 12, mask: '255.240.0.0' },
  { value: 11, mask: '255.224.0.0' },
  { value: 10, mask: '255.192.0.0' },
  { value: 9, mask: '255.128.0.0' },
  { value: 8, mask: '255.0.0.0' },
  { value: 7, mask: '254.0.0.0' },
  { value: 6, mask: '252.0.0.0' },
  { value: 5, mask: '248.0.0.0' },
  { value: 4, mask: '240.0.0.0' },
  { value: 3, mask: '224.0.0.0' },
  { value: 2, mask: '192.0.0.0' },
  { value: 1, mask: '128.0.0.0' },
  { value: 0, mask: '0.0.0.0' }
];

export type IpaddressDocument = HydratedDocument<Ipaddress>;

export interface Internet {
  mail: string;
  dateOpen: Date;
  dateClose?: Date;
  comment?: string;
}

export interface Email {
  mail: string;
  login: string;
  fullname: string;
  dateOpen: Date;
  dateClose?: Date;
  comment?: string;
}

export interface CIDR {
  value: number;
  mask: string;
}

@Schema()
export class Ipaddress {
  @Prop({ type: String, required: true, unique: true, trim: true })
  ipaddress: string;

  @Prop({ type: Number })
  indexip?: number;

  @Prop({ type: Object, required: true, default: { value: 24, mask: '255.255.255.0' } })
  cidr: CIDR;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    trim: true,
    default: null,
    autopopulate: true
  })
  unit?: Unit;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    trim: true,
    default: null,
    autopopulate: true
  })
  location?: Location;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    trim: true,
    default: null,
    autopopulate: true
  })
  company?: Company;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    trim: true,
    default: null,
    autopopulate: true
  })
  branch?: Branch;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    trim: true,
    default: null,
    autopopulate: true
  })
  enterprise?: Enterprise;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    trim: true,
    default: null,
    autopopulate: true
  })
  department?: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    trim: true,
    default: null,
    autopopulate: true
  })
  position?: Position;

  @Prop({ type: String, trim: true })
  autoanswer?: string;

  @Prop({ type: String, trim: true })
  mail?: string;

  @Prop({ type: Date, trim: true })
  date?: Date;

  @Prop({ type: String, trim: true })
  fullname?: string;

  @Prop({ type: String, trim: true })
  phone?: string;

  @Prop({ type: String, trim: true })
  comment?: string;

  @Prop({
    type: {
      mail: { type: String, required: true, trim: true },
      dateOpen: { type: Date, required: true, trim: true },
      dateClose: { type: Date, trim: true },
      comment: { type: String, trim: true }
    },
    default: {}
  })
  internet?: Internet;

  @Prop({
    type: [
      {
        mail: { type: String, required: true, trim: true },
        login: { type: String, required: true, trim: true },
        fullname: { type: String, required: true, trim: true },
        dateOpen: { type: Date, required: true, trim: true },
        dateClose: { type: Date, trim: true },
        comment: { type: String, trim: true }
      }
    ],
    default: []
  })
  email?: Email[];
}

export const IpaddressSchema = SchemaFactory.createForClass(Ipaddress);

IpaddressSchema.virtual('mask').get(function () {
  return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.mask : null;
});

IpaddressSchema.virtual('gateway').get(function () {
  return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.first : null;
});

IpaddressSchema.virtual('status.internet').get(function () {
  if (!this?.internet) return false;
  if (this?.internet?.mail && this?.internet?.dateOpen && !this?.internet?.dateClose) return true;
  return false;
});

IpaddressSchema.virtual('status.email').get(function () {
  if (!this?.email) return false;
  if (this?.email?.length === 0) return false;
  if (this?.email?.find((item) => item?.login && item?.mail && item?.dateOpen && !item?.dateClose)) return true;
  return false;
});
