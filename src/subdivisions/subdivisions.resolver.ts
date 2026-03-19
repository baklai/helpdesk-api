import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { SUBDIVISION } from 'src/common/scope/user.scope';

import { CreateSubdivisionInput } from './dto/create-subdivision.input';
import { UpdateSubdivisionInput } from './dto/update-subdivision.input';
import { SubdivisionEntity } from './entities/subdivision.entity';
import { SubdivisionsService } from './subdivisions.service';

@Resolver('Підрозділи')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class SubdivisionsResolver {
  constructor(private readonly subdivisionsService: SubdivisionsService) {}

  @Mutation(() => SubdivisionEntity, {
    name: 'createOneSubdivision',
    description: 'Створити новий підрозділ'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(SUBDIVISION.CREATE)
  async create(@Args('input') input: CreateSubdivisionInput): Promise<SubdivisionEntity> {
    return this.subdivisionsService.create(input);
  }

  @Query(() => [SubdivisionEntity], {
    name: 'findAllSubdivisions',
    description: 'Отримати список усіх підрозділів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(SUBDIVISION.READ)
  async findAll(): Promise<SubdivisionEntity[]> {
    return this.subdivisionsService.findAll();
  }

  @Query(() => SubdivisionEntity, {
    name: 'findOneSubdivisionById',
    description: 'Отримати підрозділ за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(SUBDIVISION.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<SubdivisionEntity> {
    return this.subdivisionsService.findOneById(id);
  }

  @Mutation(() => SubdivisionEntity, {
    name: 'updateOneSubdivisionById',
    description: 'Оновити дані підрозділу за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(SUBDIVISION.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSubdivisionInput
  ): Promise<SubdivisionEntity> {
    return this.subdivisionsService.updateOneById(id, input);
  }

  @Mutation(() => SubdivisionEntity, {
    name: 'removeOneSubdivisionById',
    description: 'Видалити підрозділ за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(SUBDIVISION.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<SubdivisionEntity> {
    return this.subdivisionsService.removeOneById(id);
  }
}
