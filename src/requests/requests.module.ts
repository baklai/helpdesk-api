import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Request, RequestSchema } from './schemas/request.schema';
import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Inspector.name, schema: InspectorSchema }
    ])
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
