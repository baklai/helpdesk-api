import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Onmap, OnmapSchema } from './schemas/onmap.schema';
import { OnmapsController } from './onmaps.controller';
import { OnmapsService } from './onmaps.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Onmap.name, schema: OnmapSchema }])],
  controllers: [OnmapsController],
  providers: [OnmapsService]
})
export class OnmapsModule {}
