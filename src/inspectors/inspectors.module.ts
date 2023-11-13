import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Filter, FilterSchema } from 'src/filters/schemas/filter.schema';
import { Inspector, InspectorSchema } from './schemas/inspector.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { InspectorsController } from './inspectors.controller';
import { InspectorsService } from './inspectors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspector.name, schema: InspectorSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Filter.name, schema: FilterSchema }
    ])
  ],
  controllers: [InspectorsController],
  providers: [InspectorsService]
})
export class InspectorsModule {}
