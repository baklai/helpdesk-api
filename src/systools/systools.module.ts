import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SystoolsService } from './systools.service';
import { SystoolsController } from './systools.controller';

@Module({
  controllers: [SystoolsController],
  providers: [ConfigService, SystoolsService]
})
export class SystoolsModule {}
