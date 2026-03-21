import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { JwtProfile } from 'src/common/decorators/user-jwt.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { PaginateArgs } from 'src/common/dto/paginate.args';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { REQUEST } from 'src/common/scope/user.scope';
import type { JwtPayload } from 'src/common/types/jwt-payload.type';
import { DepartmentsService } from 'src/departments/departments.service';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { LocationsService } from 'src/locations/locations.service';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { PositionsService } from 'src/positions/positions.service';
import { SubdivisionEntity } from 'src/subdivisions/entities/subdivision.entity';
import { SubdivisionsService } from 'src/subdivisions/subdivisions.service';
import { UserShortEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { RequestEntity, RequestPaginated } from './entities/request.entity';
import { Request } from './models/request.schema';
import { RequestsService } from './requests.service';

@Resolver(() => RequestEntity)
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class RequestsResolver {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
    private readonly locationsService: LocationsService,
    private readonly organizationsService: OrganizationsService,
    private readonly subdivisionsService: SubdivisionsService,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService
  ) {}

  @Mutation(() => RequestEntity, {
    name: 'createOneRequest',
    description: 'Створити новий запис у журналі заявок'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(REQUEST.CREATE)
  async create(
    @JwtProfile() user: JwtPayload,
    @Args('input') input: CreateRequestInput
  ): Promise<RequestEntity> {
    return this.requestsService.createOpened(user, input);
  }

  @Query(() => RequestPaginated, {
    name: 'findAllRequests',
    description: 'Отримати список заявок із пагінацією та фільтрами'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(REQUEST.READ)
  async findAll(@Args() args: PaginateArgs): Promise<RequestPaginated> {
    return this.requestsService.findAllPaginated(args);
  }

  @Query(() => RequestEntity, {
    name: 'findOneRequestById',
    description: 'Отримати заявку за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(REQUEST.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<RequestEntity> {
    return this.requestsService.findOneById(id);
  }

  @Mutation(() => RequestEntity, {
    name: 'updateOneRequestById',
    description: 'Оновити дані заявки за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(REQUEST.UPDATE)
  async updateOneById(
    @JwtProfile() user: JwtPayload,
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRequestInput
  ): Promise<RequestEntity> {
    return this.requestsService.updateOneOrClosedById(user, id, input);
  }

  @Mutation(() => RequestEntity, {
    name: 'removeOneRequestById',
    description: 'Видалити запис заявки за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(REQUEST.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<RequestEntity> {
    return this.requestsService.removeOneById(id);
  }

  @ResolveField(() => UserShortEntity, { nullable: true })
  async opened(@Parent() request: Request) {
    const userId = request?.opened || null;
    if (!userId || !Types.ObjectId.isValid(userId.toString())) return null;
    return this.usersService.load(userId.toString());
  }

  @ResolveField(() => UserShortEntity, { nullable: true })
  async closed(@Parent() request: Request) {
    const userId = request?.closed || null;
    if (!userId || !Types.ObjectId.isValid(userId.toString())) return null;
    return this.usersService.load(userId.toString());
  }

  @ResolveField(() => LocationEntity, { nullable: true })
  async location(@Parent() request: Request) {
    const locationId = request?.location || null;
    if (!locationId || !Types.ObjectId.isValid(locationId.toString())) return null;
    return this.locationsService.load(locationId.toString());
  }

  @ResolveField(() => OrganizationEntity, { nullable: true })
  async organization(@Parent() request: Request) {
    const organizationId = request?.organization || null;
    if (!organizationId || !Types.ObjectId.isValid(organizationId.toString())) return null;
    return this.organizationsService.load(organizationId.toString());
  }

  @ResolveField(() => SubdivisionEntity, { nullable: true })
  async subdivision(@Parent() request: Request) {
    const subdivisionId = request?.subdivision || null;
    if (!subdivisionId || !Types.ObjectId.isValid(subdivisionId.toString())) return null;
    return this.subdivisionsService.load(subdivisionId.toString());
  }

  @ResolveField(() => DepartmentEntity, { nullable: true })
  async department(@Parent() request: Request) {
    const departmentId = request?.department || null;
    if (!departmentId || !Types.ObjectId.isValid(departmentId.toString())) return null;
    return this.departmentsService.load(departmentId.toString());
  }

  @ResolveField(() => PositionEntity, { nullable: true })
  async position(@Parent() request: Request) {
    const positiontId = request?.position || null;
    if (!positiontId || !Types.ObjectId.isValid(positiontId.toString())) return null;
    return this.positionsService.load(positiontId.toString());
  }
}
