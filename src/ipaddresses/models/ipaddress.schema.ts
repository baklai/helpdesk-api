import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Netmask } from 'netmask';

import { InternetStatusType } from 'src/common/enums/status.enum';

export class Internet {
  reqnum: string;
  status: InternetStatusType;
  comment: string;
}

export class CIDR {
  value: number;
  mask: string;
}

@Schema()
export class Ipaddress {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly ipaddress: string;

  @Prop({
    type: Number,
    index: true,
    default: function (this: Ipaddress) {
      return this.ipaddress ? new Netmask(this.ipaddress as string).netLong : null;
    }
  })
  readonly indexip: number;

  @Prop({
    type: {
      value: { type: Number, default: 24 },
      mask: { type: String, default: '255.255.255.0' }
    },
    required: true,
    default: { value: 24, mask: '255.255.255.0' }
  })
  readonly cidr: CIDR;

  @Prop({
    type: {
      reqnum: { type: String, default: null },
      status: { type: String, enum: InternetStatusType, default: InternetStatusType.NONE },
      comment: { type: String, default: null }
    }
  })
  readonly internet?: Internet;

  @Prop({ type: String, required: true, trim: true })
  readonly reqnum?: string;

  @Prop({ type: String, required: true, trim: true })
  readonly fullname: string;

  @Prop({ type: String, required: true, trim: true })
  readonly phone: string;

  @Prop({ type: String, trim: true })
  readonly email?: string;

  @Prop({ type: String, trim: true })
  readonly inventory?: string;

  @Prop({ type: String, trim: true })
  readonly autoanswer?: string;

  @Prop({ type: String, trim: true })
  readonly comment?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device', default: null })
  readonly device?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: null })
  readonly location?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null })
  readonly organization?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subdivision', default: null })
  readonly subdivision?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null })
  readonly department?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Position', default: null })
  readonly position?: mongoose.Types.ObjectId;

  @Virtual({
    get: function (this: Ipaddress): string | null {
      return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.mask : null;
    }
  })
  mask: string;

  @Virtual({
    get: function (this: Ipaddress): string | null {
      return this?.cidr ? new Netmask(`${this?.ipaddress}/${this?.cidr?.value}`)?.first : null;
    }
  })
  gateway: string;
}

export type IpaddressDocument = HydratedDocument<Ipaddress>;

export const IpaddressSchema = SchemaFactory.createForClass(Ipaddress);
