import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { POSITION } from 'src/common/scope/user.scope';

import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { PositionEntity } from './entities/position.entity';
import { PositionsService } from './positions.service';

@Resolver('Посади')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Mutation(() => PositionEntity, {
    name: 'createOnePosition',
    description: 'Створити нову посаду'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(POSITION.CREATE)
  async create(@Args('input') input: CreatePositionInput): Promise<PositionEntity> {
    return this.positionsService.create(input);
  }

  @Query(() => [PositionEntity], {
    name: 'findAllPositions',
    description: 'Отримати список усіх посад'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(POSITION.READ)
  async findAll(): Promise<PositionEntity[]> {
    return this.positionsService.findAll();
  }

  @Query(() => PositionEntity, {
    name: 'findOnePositionById',
    description: 'Отримати посаду за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(POSITION.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<PositionEntity> {
    return this.positionsService.findOneById(id);
  }

  @Mutation(() => PositionEntity, {
    name: 'updateOnePositionById',
    description: 'Оновити дані посади за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(POSITION.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePositionInput
  ): Promise<PositionEntity> {
    return this.positionsService.updateOneById(id, input);
  }

  @Mutation(() => PositionEntity, {
    name: 'removeOnePositionById',
    description: 'Видалити посаду за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(POSITION.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<PositionEntity> {
    return this.positionsService.removeOneById(id);
  }
}
