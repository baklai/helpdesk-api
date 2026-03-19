import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLJSON } from 'graphql-type-json';

import { Channel, ChannelSchema } from 'src/channels/models/channel.schema';
import { Department, DepartmentSchema } from 'src/departments/models/department.schema';
import { Device, DeviceSchema } from 'src/devices/models/device.schema';
import { Inspector, InspectorSchema } from 'src/inspectors/models/inspector.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/models/ipaddress.schema';
import { Location, LocationSchema } from 'src/locations/models/location.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/models/mailbox.schema';
import { Organization, OrganizationSchema } from 'src/organizations/models/organization.schema';
import { Position, PositionSchema } from 'src/positions/models/position.schema';
import { Request, RequestSchema } from 'src/requests/models/request.schema';
import { Subdivision, SubdivisionSchema } from 'src/subdivisions/models/subdivision.schema';
import { SysLog, SysLogSchema } from 'src/syslogs/models/syslog.schema';
import { User, UserSchema } from 'src/users/models/user.schema';

import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Inspector.name, schema: InspectorSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Subdivision.name, schema: SubdivisionSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Position.name, schema: PositionSchema },
      { name: Device.name, schema: DeviceSchema },
      { name: User.name, schema: UserSchema },
      { name: SysLog.name, schema: SysLogSchema }
    ])
  ],
  providers: [
    StatisticsResolver,
    StatisticsService,
    {
      provide: 'JSON',
      useValue: GraphQLJSON
    }
  ]
})
export class StatisticsModule {}
