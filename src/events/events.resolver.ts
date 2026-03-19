import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { EVENT } from 'src/common/scope/user.scope';

import { CreateEventInput } from './dto/create-event.input';
import { EventArgs } from './dto/event.args';
import { UpdateEventInput } from './dto/update-event.input';
import { EventEntity } from './entities/event.entity';
import { EventsService } from './events.service';

@Resolver('Календар подій')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => EventEntity, { name: 'createOneEvent', description: 'Створити нову подію' })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(EVENT.CREATE)
  async create(@Args('input') input: CreateEventInput): Promise<EventEntity> {
    return this.eventsService.create(input);
  }

  @Query(() => [EventEntity], {
    name: 'findAllEvents',
    description: 'Отримати список подій за вказаний період'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(EVENT.READ)
  async findAll(@Args() args: EventArgs): Promise<EventEntity[]> {
    return this.eventsService.findAllByDateRange(args);
  }

  @Query(() => EventEntity, {
    name: 'findOneEventById',
    description: 'Отримати подію за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(EVENT.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<EventEntity> {
    return this.eventsService.findOneById(id);
  }

  @Mutation(() => EventEntity, {
    name: 'updateOneEventById',
    description: 'Оновити дані події за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(EVENT.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateEventInput
  ): Promise<EventEntity> {
    return this.eventsService.updateOneById(id, input);
  }

  @Mutation(() => EventEntity, {
    name: 'removeOneEventById',
    description: 'Видалити подію за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(EVENT.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<EventEntity> {
    return this.eventsService.removeOneById(id);
  }
}
