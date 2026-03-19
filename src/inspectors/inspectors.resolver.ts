import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPv4 } from 'src/common/decorators/ipv4.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { PaginateArgs } from 'src/common/dto/paginate.args';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { INSPECTOR } from 'src/common/scope/user.scope';

import { CreateInspectorInput } from './dto/create-inspector.input';
import { InspectorEntity, InspectorPaginated } from './entities/inspector.entity';
import { InspectorsService } from './inspectors.service';

@Resolver('ПК SysInspector')
export class InspectorsResolver {
  constructor(private readonly inspectorsService: InspectorsService) {}

  @Mutation(() => Boolean, {
    name: 'createOneInspector',
    description: 'Створити новий запис PC SysLogInspector'
  })
  async create(@IPv4() ipaddress: string, @Args('input') input: CreateInspectorInput) {
    return this.inspectorsService.create(ipaddress, input);
  }

  @Query(() => InspectorPaginated, {
    name: 'findAllInspectors',
    description: 'Отримати список записів із пагінацією'
  })
  @UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(INSPECTOR.READ)
  async findAll(@Args() args: PaginateArgs): Promise<InspectorPaginated> {
    return this.inspectorsService.findAll(args);
  }

  @Query(() => InspectorEntity, {
    name: 'findOneInspectorById',
    description: 'Отримати запис за ідентифікатором запису'
  })
  @UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(INSPECTOR.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<InspectorEntity> {
    return this.inspectorsService.findOneById(id);
  }

  @Mutation(() => InspectorEntity, {
    name: 'removeOneInspectorById',
    description: 'Видалити запис за ідентифікатором запису'
  })
  @UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(INSPECTOR.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<InspectorEntity> {
    return this.inspectorsService.removeOneById(id);
  }
}
