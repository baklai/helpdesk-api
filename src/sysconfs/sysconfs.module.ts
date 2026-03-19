import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SysConf, SysConfSchema } from './models/sysconf.schema';
import { SysConfsResolver } from './sysconfs.resolver';
import { SysConfsService } from './sysconfs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SysConf.name, schema: SysConfSchema }])],
  providers: [SysConfsResolver, SysConfsService],
  exports: [SysConfsService]
})
export class SysConfsModule {}
