import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';

import { StatisticsService } from './statistics.service';

@Resolver('Статистика')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Query(() => GraphQLJSON, {
    name: 'getNetworkStatistic',
    description: 'Отримати зведену статистику мережевих ресурсів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  async network(): Promise<Record<string, any>> {
    return await this.statisticsService.network();
  }

  @Query(() => GraphQLJSON, {
    name: 'getMailboxStatistic',
    description: 'Отримати зведену статистику електронної пошти'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  async mailbox(): Promise<Record<string, any>> {
    return await this.statisticsService.mailbox();
  }

  @Query(() => GraphQLJSON, {
    name: 'getRequestStatistic',
    description: 'Отримати статистику за заявками та зверненнями'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  async request(): Promise<Record<string, any>> {
    return await this.statisticsService.request();
  }

  @Query(() => GraphQLJSON, {
    name: 'getInspectorStatistic',
    description: 'Отримати статистику за звітами SysInspector'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  async inspector(): Promise<Record<string, any>> {
    return await this.statisticsService.inspector();
  }

  @Query(() => GraphQLJSON, {
    name: 'getDashboardStatistic',
    description: 'Отримати загальну статистику'
  })
  @Role(UserRole.ADMIN)
  async dashboard(): Promise<Record<string, any>> {
    return await this.statisticsService.dashboard();
  }
}
