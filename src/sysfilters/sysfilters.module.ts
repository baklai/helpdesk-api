import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Sysfilter, SysfilterSchema } from './schemas/sysfilter.schema';
import { SysfiltersController } from './sysfilters.controller';
import { SysfiltersService } from './sysfilters.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sysfilter.name, schema: SysfilterSchema }])],
  controllers: [SysfiltersController],
  providers: [SysfiltersService]
})
export class SysfiltersModule {}
