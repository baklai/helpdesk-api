import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';
import { SysLog, SysLogSchema } from './models/syslog.schema';
import { SysLogsResolver } from './syslogs.resolver';
import { SysLogsService } from './syslogs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SysLog.name, schema: SysLogSchema }]), UsersModule],
  providers: [SysLogsResolver, SysLogsService],
  exports: [SysLogsService]
})
export class SysLogsModule {}
