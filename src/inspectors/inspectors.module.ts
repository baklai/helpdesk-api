import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Sysfilter, SysfilterSchema } from 'src/sysfilters/schemas/sysfilter.schema';

import { Inspector, InspectorSchema } from './schemas/inspector.schema';
import { InspectorsController } from './inspectors.controller';
import { InspectorsService } from './inspectors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspector.name, schema: InspectorSchema },
      { name: Sysfilter.name, schema: SysfilterSchema }
    ])
  ],
  controllers: [InspectorsController],
  providers: [InspectorsService]
})
export class InspectorsModule {}
