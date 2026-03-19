import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Department {
  @Prop({ type: String, required: true, unique: true, trim: true })
  readonly name: string;

  @Prop({ type: String, trim: true })
  readonly description?: string;
}

export type DepartmentDocument = HydratedDocument<Department>;

export const DepartmentSchema = SchemaFactory.createForClass(Department);
