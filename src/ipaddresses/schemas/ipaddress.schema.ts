import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Netmask } from 'netmask';

import { Unit } from 'src/units/schemas/unit.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { Company } from 'src/companies/schemas/company.schema';
import { Branch } from 'src/branches/schemas/branch.schema';
import { Enterprise } from 'src/enterprises/schemas/enterprise.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Position } from 'src/positions/schemas/position.schema';

export type IpaddressDocument = HydratedDocument<Ipaddress>;

export interface Internet {
  reqnum: string;
  dateOpen: Date;
  dateClose: Date;
  comment: string;
}

export interface CIDR {
  value: number;
  mask: string;
}

@Schema()
export class Ipaddress {
  @Prop({ type: String, required: true, unique: true, trim: true })
  ipaddress: string;

  @Prop({
    type: Number,
    default: function () {
      if (this?.ipaddress) {
        return new Netmask(this.ipaddress).netLong;
      }
      return null;
    }
  })
  indexip: number;

  @Prop({ type: Object, required: true, default: { value: 24, mask: '255.255.255.0' } })
  cidr: CIDR;

  @Prop({ type: String, required: true, default: null, trim: true })
  reqnum: string;

  @Prop({ type: Date, required: true, trim: true })
  date: Date;

  @Prop({ type: String, required: true, trim: true })
  fullname: string;

  @Prop({ type: String, required: true, trim: true })
  phone: string;

  @Prop({ type: String, trim: true })
  autoanswer: string;

  @Prop({
    type: {
      reqnum: { type: String, required: true, trim: true },
      dateOpen: { type: Date, required: true, trim: true },
      dateClose: { type: Date, trim: true },
      comment: { type: String, trim: true }
    },
    default: null
  })
  internet: Internet;

  @Prop({ type: String, trim: true })
  comment: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    default: null,
    autopopulate: true
  })
  unit: Unit;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    default: null,
    autopopulate: true
  })
  location: Location;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    default: null,
    autopopulate: true
  })
  company: Company;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    default: null,
    autopopulate: true
  })
  branch: Branch;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    default: null,
    autopopulate: true
  })
  enterprise: Enterprise;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null,
    autopopulate: true
  })
  department: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    default: null,
    autopopulate: true
  })
  position: Position;
}

export const IpaddressSchema = SchemaFactory.createForClass(Ipaddress);

IpaddressSchema.virtual('mask').get(function () {
  return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.mask : null;
});

IpaddressSchema.virtual('gateway').get(function () {
  return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.first : null;
});

IpaddressSchema.virtual('inetStatus').get(function () {
  if (!this?.internet) return false;
  if (this?.internet?.reqnum && this?.internet?.dateOpen && !this?.internet?.dateClose) return true;
  return false;
});
