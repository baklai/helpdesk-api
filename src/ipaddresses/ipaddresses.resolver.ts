import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { PaginateArgs } from 'src/common/dto/paginate.args';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { IPADDRESS } from 'src/common/scope/user.scope';
import { DepartmentsService } from 'src/departments/departments.service';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { DevicesService } from 'src/devices/devices.service';
import { DeviceEntity } from 'src/devices/entities/device.entity';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { LocationsService } from 'src/locations/locations.service';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { PositionsService } from 'src/positions/positions.service';
import { SubdivisionEntity } from 'src/subdivisions/entities/subdivision.entity';
import { SubdivisionsService } from 'src/subdivisions/subdivisions.service';

import { CreateIpaddressInput } from './dto/create-ipaddress.input';
import { UpdateIpaddressInput } from './dto/update-ipaddress.input';
import { IpaddressEntity, IpaddressPaginated } from './entities/ipaddress.entity';
import { IpaddressesService } from './ipaddresses.service';

@Resolver(() => IpaddressEntity)
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class IpaddressesResolver {
  constructor(
    private readonly ipaddressesService: IpaddressesService,
    private readonly locationsService: LocationsService,
    private readonly organizationsService: OrganizationsService,
    private readonly subdivisionsService: SubdivisionsService,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService,
    private readonly devicesService: DevicesService
  ) {}

  @Mutation(() => IpaddressEntity, {
    name: 'createOneIpaddress',
    description: 'Створити новий запис IP-адреси'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(IPADDRESS.CREATE)
  async create(@Args('input') input: CreateIpaddressInput): Promise<IpaddressEntity> {
    return this.ipaddressesService.create(input);
  }

  @Query(() => IpaddressPaginated, {
    name: 'findAllIpaddresses',
    description: 'Отримати список IP-адрес із пагінацією'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(IPADDRESS.READ)
  async findAll(@Args() args: PaginateArgs): Promise<IpaddressPaginated> {
    return this.ipaddressesService.findAllPaginated(args);
  }

  @Query(() => IpaddressEntity, {
    name: 'findOneIpaddressById',
    description: 'Отримати запис IP-адреси за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(IPADDRESS.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string) {
    return this.ipaddressesService.findOneById(id);
  }

  @Query(() => IpaddressEntity, {
    name: 'findOneIpaddressByIP',
    description: 'Отримати запис IP-адреси за IP-адресою'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(IPADDRESS.READ)
  async findOneByIP(@Args('ip', { type: () => String }) ip: string) {
    return this.ipaddressesService.findOneByIP(ip);
  }

  @Mutation(() => IpaddressEntity, {
    name: 'updateOneIpaddressById',
    description: 'Оновити дані IP-адреси за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(IPADDRESS.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateIpaddressInput
  ) {
    return this.ipaddressesService.updateOneById(id, input);
  }

  @Mutation(() => IpaddressEntity, {
    name: 'removeOneIpaddressById',
    description: 'Видалити запис IP-адреси за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(IPADDRESS.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string) {
    return this.ipaddressesService.removeOneById(id);
  }

  @ResolveField(() => DeviceEntity, { nullable: true })
  async device(@Parent() ipaddress: IpaddressEntity) {
    const deviceId = ipaddress.device;
    if (!deviceId || !Types.ObjectId.isValid(deviceId.toString())) return null;
    return this.devicesService.load(deviceId.toString());
  }

  @ResolveField(() => LocationEntity, { nullable: true })
  async location(@Parent() ipaddress: IpaddressEntity) {
    const locationId = ipaddress.location;
    if (!locationId || !Types.ObjectId.isValid(locationId.toString())) return null;
    return this.locationsService.load(locationId.toString());
  }

  @ResolveField(() => OrganizationEntity, { nullable: true })
  async organization(@Parent() ipaddress: IpaddressEntity) {
    const organizationId = ipaddress.organization;
    if (!organizationId || !Types.ObjectId.isValid(organizationId.toString())) return null;
    return this.organizationsService.load(organizationId.toString());
  }

  @ResolveField(() => SubdivisionEntity, { nullable: true })
  async subdivision(@Parent() ipaddress: IpaddressEntity) {
    const subdivisionId = ipaddress.subdivision;
    if (!subdivisionId || !Types.ObjectId.isValid(subdivisionId.toString())) return null;
    return this.subdivisionsService.load(subdivisionId.toString());
  }

  @ResolveField(() => DepartmentEntity, { nullable: true })
  async department(@Parent() ipaddress: IpaddressEntity) {
    const departmentId = ipaddress.department;
    if (!departmentId || !Types.ObjectId.isValid(departmentId.toString())) return null;
    return this.departmentsService.load(departmentId.toString());
  }

  @ResolveField(() => PositionEntity, { nullable: true })
  async position(@Parent() ipaddress: IpaddressEntity) {
    const positiontId = ipaddress.position;
    if (!positiontId || !Types.ObjectId.isValid(positiontId.toString())) return null;
    return this.positionsService.load(positiontId.toString());
  }
}
