import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileHostingService } from './filehosting.service';
import { FilehostingController } from './filehosting.controller';

@Module({
  controllers: [FilehostingController],
  providers: [ConfigService, FileHostingService]
})
export class FilehostingModule {}
