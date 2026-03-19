import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { PaginateArgs } from 'src/common/dto/paginate.args';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';

import { UsersService } from 'src/users/users.service';
import { SysLogEntity, SysLogPaginated } from './entities/syslog.entity';
import { SysLogsService } from './syslogs.service';
import { UserShortEntity } from 'src/users/entities/user.entity';

@Resolver(() => SysLogEntity)
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class SysLogsResolver {
  constructor(
    private readonly sysLogsService: SysLogsService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => SysLogPaginated, {
    name: 'findAllSysLogs',
    description: 'Отримати список усіх системних логів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async findAll(@Args() args: PaginateArgs): Promise<SysLogPaginated> {
    return this.sysLogsService.findAll(args);
  }

  @Query(() => SysLogEntity, {
    name: 'findOneSysLogById',
    description: 'Отримати системний лог за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<SysLogEntity> {
    return this.sysLogsService.findOneById(id);
  }

  @Mutation(() => SysLogEntity, {
    name: 'removeOneSysLogById',
    description: 'Видалити системний лог за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<SysLogEntity> {
    return this.sysLogsService.removeOneById(id);
  }

  @Mutation(() => String, {
    name: 'removeAllSysLogs',
    description: 'Повне очищення системного журналу'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async removeAll(): Promise<string> {
    return this.sysLogsService.removeAll();
  }

  @ResolveField(() => UserShortEntity, { nullable: true })
  async user(@Parent() syslog: SysLogEntity) {
    if (!syslog.user) return null;
    return this.usersService.findOneById(syslog.user.toString());
  }
}
