import { InputType, PartialType } from '@nestjs/graphql';
import { CreateInspectorInput } from './create-inspector.input';

@InputType()
export class UpdateInspectorInput extends PartialType(CreateInspectorInput) {}
