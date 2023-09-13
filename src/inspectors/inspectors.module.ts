import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Filter, FilterSchema } from 'src/filters/schemas/filter.schema';

import { Inspector, InspectorSchema } from './schemas/inspector.schema';
import { InspectorsController } from './inspectors.controller';
import { InspectorsService } from './inspectors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspector.name, schema: InspectorSchema },
      { name: Filter.name, schema: FilterSchema }
    ])
  ],
  controllers: [InspectorsController],
  providers: [InspectorsService]
})
export class InspectorsModule {}
