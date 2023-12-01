import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Option, OptionSchema } from 'src/options/schemas/option.schema';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }])],
  controllers: [OptionsController],
  providers: [OptionsService]
})
export class OptionsModule {}
