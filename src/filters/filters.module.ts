import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Filter, FilterSchema } from './schemas/filter.schema';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Filter.name, schema: FilterSchema }])],
  controllers: [FiltersController],
  providers: [FiltersService]
})
export class FiltersModule {}
