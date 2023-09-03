import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: false, timestamps: false })
export class Logger extends Document {}

export const LoggerSchema = SchemaFactory.createForClass(Logger);
