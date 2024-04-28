import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestSchema } from 'src/requests/schemas/request.schema';
import { Channel, ChannelSchema } from 'src/channels/schemas/channel.schema';
import { Mailbox, MailboxSchema } from 'src/mailboxes/schemas/mailbox.schema';
import { Organization, OrganizationSchema } from 'src/organizations/schemas/organization.schema';
import { Subdivision, SubdivisionSchema } from 'src/subdivisions/schemas/subdivision.schema';
import { Department, DepartmentSchema } from 'src/departments/schemas/department.schema';
import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Location, LocationSchema } from 'src/locations/schemas/location.schema';
import { Position, PositionSchema } from 'src/positions/schemas/position.schema';
import { Filter, FilterSchema } from 'src/filters/schemas/filter.schema';
import { Unit, UnitSchema } from 'src/units/schemas/unit.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Syslog, SyslogSchema } from 'src/syslogs/schemas/syslog.schema';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Inspector.name, schema: InspectorSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Subdivision.name, schema: SubdivisionSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Position.name, schema: PositionSchema },
      { name: Filter.name, schema: FilterSchema },
      { name: Unit.name, schema: UnitSchema },
      { name: User.name, schema: UserSchema },
      { name: Syslog.name, schema: SyslogSchema }
    ])
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
