import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { LOCATION } from 'src/common/scope/user.scope';

import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { LocationEntity } from './entities/location.entity';
import { LocationsService } from './locations.service';

@Resolver('Локації')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => LocationEntity, {
    name: 'createOneLocation',
    description: 'Створити нову локацію'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(LOCATION.CREATE)
  async create(@Args('input') input: CreateLocationInput): Promise<LocationEntity> {
    return this.locationsService.create(input);
  }

  @Query(() => [LocationEntity], {
    name: 'findAllLocations',
    description: 'Отримати список усіх локацій'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(LOCATION.READ)
  async findAll(): Promise<LocationEntity[]> {
    return this.locationsService.findAll();
  }

  @Query(() => LocationEntity, {
    name: 'findOneLocationById',
    description: 'Пошук локації за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(LOCATION.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<LocationEntity> {
    return this.locationsService.findOneById(id);
  }

  @Mutation(() => LocationEntity, {
    name: 'updateOneLocationById',
    description: 'Оновити дані локації за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(LOCATION.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateLocationInput
  ): Promise<LocationEntity> {
    return this.locationsService.updateOneById(id, input);
  }

  @Mutation(() => LocationEntity, {
    name: 'removeOneLocationById',
    description: 'Видалити локацію за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(LOCATION.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<LocationEntity> {
    return this.locationsService.removeOneById(id);
  }
}
