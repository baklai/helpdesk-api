import { Module } from '@nestjs/common';

import { SysToolsResolver } from './systools.resolver';
import { SysToolsService } from './systools.service';

@Module({
  providers: [SysToolsResolver, SysToolsService]
})
export class SysToolsModule {}
