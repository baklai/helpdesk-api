import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Subdivision, SubdivisionSchema } from './schemas/subdivision.schema';
import { SubdivisionsService } from './subdivisions.service';
import { SubdivisionsController } from './subdivisions.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subdivision.name, schema: SubdivisionSchema }])],
  controllers: [SubdivisionsController],
  providers: [SubdivisionsService]
})
export class SubdivisionsModule {}
