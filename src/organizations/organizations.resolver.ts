import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { ORGANIZATION } from 'src/common/scope/user.scope';

import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationsService } from './organizations.service';

@Resolver('Організації')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation(() => OrganizationEntity, {
    name: 'createOneOrganization',
    description: 'Створити нову організацію'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(ORGANIZATION.CREATE)
  async create(@Args('input') input: CreateOrganizationInput): Promise<OrganizationEntity> {
    return this.organizationsService.create(input);
  }

  @Query(() => [OrganizationEntity], {
    name: 'findAllOrganizations',
    description: 'Отримати список усіх організацій'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(ORGANIZATION.READ)
  async findAll(): Promise<OrganizationEntity[]> {
    return this.organizationsService.findAll();
  }

  @Query(() => OrganizationEntity, {
    name: 'findOneOrganizationById',
    description: 'Отримати організацію за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(ORGANIZATION.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<OrganizationEntity> {
    return this.organizationsService.findOneById(id);
  }

  @Mutation(() => OrganizationEntity, {
    name: 'updateOneOrganizationById',
    description: 'Оновити дані організації за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(ORGANIZATION.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateOrganizationInput
  ): Promise<OrganizationEntity> {
    return this.organizationsService.updateOneById(id, input);
  }

  @Mutation(() => OrganizationEntity, {
    name: 'removeOneOrganizationById',
    description: 'Видалити організацію за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(ORGANIZATION.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<OrganizationEntity> {
    return this.organizationsService.removeOneById(id);
  }
}
