import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Enterprise, EnterpriseSchema } from './schemas/enterprise.schema';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesService } from './enterprises.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Enterprise.name, schema: EnterpriseSchema }])],
  controllers: [EnterprisesController],
  providers: [EnterprisesService]
})
export class EnterprisesModule {}
