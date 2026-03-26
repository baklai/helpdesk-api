import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { JwtProfile } from 'src/common/decorators/user-jwt.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { PUB_SUB } from 'src/common/subscriptions/pubsub.provider';
import type { JwtPayload } from 'src/common/types/jwt-payload.type';

import { CreateNoticeInput } from './dto/create-notice.input';
import { NoticeEntity } from './entities/notice.entity';
import { NoticesService } from './notices.service';

@Resolver(() => NoticeEntity)
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class NoticesResolver {
  constructor(
    private readonly noticesService: NoticesService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) {}

  @Mutation(() => Boolean, {
    name: 'createOneNotice',
    description: 'Створити нове сповіщення'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Args('input') input: CreateNoticeInput): Promise<boolean> {
    return this.noticesService.create(input);
  }

  @Query(() => [NoticeEntity], {
    name: 'findAllNotices',
    description: 'Отримати список усіх сповіщень'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async findAll(@JwtProfile() user: JwtPayload): Promise<NoticeEntity[]> {
    return this.noticesService.findAll(user);
  }

  @Mutation(() => NoticeEntity, {
    name: 'removeOneNoticeById',
    description: 'Видалити сповіщення за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async removeOneById(
    @JwtProfile() user: JwtPayload,
    @Args('id') id: string
  ): Promise<NoticeEntity> {
    return this.noticesService.removeOneById(id, user);
  }

  @Subscription(() => NoticeEntity, { name: 'notice' })
  notice() {
    return this.pubSub.asyncIterableIterator('notice');
  }
}
