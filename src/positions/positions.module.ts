import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Position, PositionSchema } from './schemas/position.schema';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Position.name, schema: PositionSchema }])],
  controllers: [PositionsController],
  providers: [PositionsService]
})
export class PositionsModule {}
