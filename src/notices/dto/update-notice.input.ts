import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNoticeInput } from './create-notice.input';

@InputType({ description: 'Оновлення сповіщення' })
export class UpdateNoticeInput extends PartialType(CreateNoticeInput) {}
