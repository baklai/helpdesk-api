import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InspectorsResolver } from './inspectors.resolver';
import { InspectorsService } from './inspectors.service';
import { Inspector, InspectorSchema } from './models/inspector.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Inspector.name, schema: InspectorSchema }])],
  providers: [InspectorsResolver, InspectorsService],
  exports: [InspectorsService]
})
export class InspectorsModule {}
