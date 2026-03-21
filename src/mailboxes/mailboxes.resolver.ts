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
import { MAILBOX } from 'src/common/scope/user.scope';
import { DepartmentsService } from 'src/departments/departments.service';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { IpaddressEntity } from 'src/ipaddresses/entities/ipaddress.entity';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { PositionsService } from 'src/positions/positions.service';
import { SubdivisionEntity } from 'src/subdivisions/entities/subdivision.entity';
import { SubdivisionsService } from 'src/subdivisions/subdivisions.service';

import { CreateMailboxInput } from './dto/create-mailbox.input';
import { UpdateMailboxInput } from './dto/update-mailbox.input';
import { MailboxEntity, MailboxPaginated } from './entities/mailbox.entity';
import { MailboxesService } from './mailboxes.service';

@Resolver(() => MailboxEntity)
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class MailboxesResolver {
  constructor(
    private readonly mailboxesService: MailboxesService,
    private readonly organizationsService: OrganizationsService,
    private readonly subdivisionsService: SubdivisionsService,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService
  ) {}

  @Mutation(() => MailboxEntity, {
    name: 'createOneMailbox',
    description: 'Створити нову поштову скриньку'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(MAILBOX.CREATE)
  async create(@Args('input') input: CreateMailboxInput): Promise<MailboxEntity> {
    return this.mailboxesService.create(input);
  }

  @Query(() => MailboxPaginated, {
    name: 'findAllMailboxes',
    description: 'Отримати список поштових скриньок із пагінацією'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(MAILBOX.READ)
  async findAll(@Args() args: PaginateArgs): Promise<MailboxPaginated> {
    return this.mailboxesService.findAllPaginated(args);
  }

  @Query(() => MailboxEntity, {
    name: 'findOneMailboxById',
    description: 'Отримати поштову скриньку за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(MAILBOX.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<MailboxEntity> {
    return this.mailboxesService.findOneById(id);
  }

  @Mutation(() => MailboxEntity, {
    name: 'updateOneMailboxById',
    description: 'Оновити дані поштової скриньки за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(MAILBOX.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateMailboxInput
  ): Promise<MailboxEntity> {
    return this.mailboxesService.updateOneById(id, input);
  }

  @Mutation(() => MailboxEntity, {
    name: 'removeOneMailboxById',
    description: 'Видалити запис поштової скриньки за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(MAILBOX.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<MailboxEntity> {
    return this.mailboxesService.removeOneById(id);
  }

  @ResolveField(() => OrganizationEntity, { nullable: true })
  async organization(@Parent() ipaddress: IpaddressEntity) {
    const organizationId = ipaddress?.organization?.id || null;
    if (!organizationId || !Types.ObjectId.isValid(organizationId.toString())) return null;
    return this.organizationsService.load(organizationId.toString());
  }

  @ResolveField(() => SubdivisionEntity, { nullable: true })
  async subdivision(@Parent() ipaddress: IpaddressEntity) {
    const subdivisionId = ipaddress?.subdivision?.id || null;
    if (!subdivisionId || !Types.ObjectId.isValid(subdivisionId.toString())) return null;
    return this.subdivisionsService.load(subdivisionId.toString());
  }

  @ResolveField(() => DepartmentEntity, { nullable: true })
  async department(@Parent() ipaddress: IpaddressEntity) {
    const departmentId = ipaddress?.department?.id || null;
    if (!departmentId || !Types.ObjectId.isValid(departmentId.toString())) return null;
    return this.departmentsService.load(departmentId.toString());
  }

  @ResolveField(() => PositionEntity, { nullable: true })
  async position(@Parent() ipaddress: IpaddressEntity) {
    const positiontId = ipaddress?.position?.id || null;
    if (!positiontId || !Types.ObjectId.isValid(positiontId.toString())) return null;
    return this.positionsService.load(positiontId.toString());
  }
}
