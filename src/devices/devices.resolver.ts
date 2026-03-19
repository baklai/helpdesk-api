import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { DEVICE } from 'src/common/scope/user.scope';

import { DevicesService } from './devices.service';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { DeviceEntity } from './entities/device.entity';

@Resolver('Пристрої')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Mutation(() => DeviceEntity, { name: 'createOneDevice', description: 'Створити новий пристрій' })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(DEVICE.CREATE)
  async create(@Args('input') input: CreateDeviceInput): Promise<DeviceEntity> {
    return this.devicesService.create(input);
  }

  @Query(() => [DeviceEntity], {
    name: 'findAllDevices',
    description: 'Отримати список усіх пристроїв'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(DEVICE.READ)
  async findAll(): Promise<DeviceEntity[]> {
    return this.devicesService.findAll();
  }

  @Query(() => DeviceEntity, {
    name: 'findOneDeviceById',
    description: 'Отримати пристрій за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(DEVICE.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<DeviceEntity> {
    return this.devicesService.findOneById(id);
  }

  @Mutation(() => DeviceEntity, {
    name: 'updateOneDeviceById',
    description: 'Оновити дані пристрою за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(DEVICE.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDeviceInput
  ): Promise<DeviceEntity> {
    return this.devicesService.updateOneById(id, input);
  }

  @Mutation(() => DeviceEntity, {
    name: 'removeOneDeviceById',
    description: 'Видалити пристрій за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(DEVICE.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<DeviceEntity> {
    return this.devicesService.removeOneById(id);
  }
}
