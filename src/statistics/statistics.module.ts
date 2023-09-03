import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestSchema } from 'src/requests/schemas/request.schema';
import { Branch, BranchSchema } from 'src/branches/schemas/branch.schema';
import { Channel, ChannelSchema } from 'src/channels/schemas/channel.schema';
import { Company, CompanySchema } from 'src/companies/schemas/company.schema';
import { Department, DepartmentSchema } from 'src/departments/schemas/department.schema';
import { Enterprise, EnterpriseSchema } from 'src/enterprises/schemas/enterprise.schema';
import { Inspector, InspectorSchema } from 'src/inspectors/schemas/inspector.schema';
import { Ipaddress, IpaddressSchema } from 'src/ipaddresses/schemas/ipaddress.schema';
import { Location, LocationSchema } from 'src/locations/schemas/location.schema';
import { Position, PositionSchema } from 'src/positions/schemas/position.schema';
import { Sysfilter, SysfilterSchema } from 'src/sysfilters/schemas/sysfilter.schema';
import { Unit, UnitSchema } from 'src/units/schemas/unit.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Enterprise.name, schema: EnterpriseSchema },
      { name: Inspector.name, schema: InspectorSchema },
      { name: Ipaddress.name, schema: IpaddressSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Position.name, schema: PositionSchema },
      { name: Sysfilter.name, schema: SysfilterSchema },
      { name: Unit.name, schema: UnitSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
