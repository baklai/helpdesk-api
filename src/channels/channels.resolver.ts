import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { PaginateArgs } from 'src/common/dto/paginate.args';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { CHANNEL } from 'src/common/scope/user.scope';

import { ChannelsService } from './channels.service';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { ChannelEntity, ChannelPaginated } from './entities/channel.entity';

@Resolver('Канали')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Mutation(() => ChannelEntity, { name: 'createOneChannel', description: 'Створити новий канал' })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(CHANNEL.CREATE)
  async create(@Args('input') input: CreateChannelInput): Promise<ChannelEntity> {
    return this.channelsService.create(input);
  }

  @Query(() => ChannelPaginated, {
    name: 'findAllChannels',
    description: 'Отримати список усіх каналів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(CHANNEL.READ)
  async findAll(@Args() args: PaginateArgs): Promise<ChannelPaginated> {
    return this.channelsService.findAllPaginated(args);
  }

  @Query(() => ChannelEntity, {
    name: 'findOneChannelById',
    description: 'Пошук каналу за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(CHANNEL.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<ChannelEntity> {
    return this.channelsService.findOneById(id);
  }

  @Mutation(() => ChannelEntity, {
    name: 'updateOneChannelById',
    description: 'Оновити дані каналу за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(CHANNEL.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateChannelInput
  ): Promise<ChannelEntity> {
    return this.channelsService.updateOneById(id, input);
  }

  @Mutation(() => ChannelEntity, {
    name: 'removeOneChannelById',
    description: 'Видалити канал за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(CHANNEL.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<ChannelEntity> {
    return this.channelsService.removeOneById(id);
  }
}
