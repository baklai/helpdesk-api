import { Module } from '@nestjs/common';
import { FtpclientService } from './ftpclient.service';
import { FtpclientController } from './ftpclient.controller';

@Module({
  controllers: [FtpclientController],
  providers: [FtpclientService]
})
export class FtpclientModule {}
