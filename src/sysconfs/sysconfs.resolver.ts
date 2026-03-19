import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';

import { UpsertSysConfInput } from './dto/upsert-sysconf.input';
import { SysConfEntity } from './entities/sysconf.entity';
import { SysConfsService } from './sysconfs.service';

@Resolver('Налаштування системи')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class SysConfsResolver {
  constructor(private readonly sysConfsService: SysConfsService) {}

  @Mutation(() => SysConfEntity, {
    name: 'upsertOneSysConf',
    description: 'Створити/оновити системне налаштування'
  })
  @Role(UserRole.ADMIN)
  async upsert(@Args('input') input: UpsertSysConfInput): Promise<SysConfEntity> {
    return this.sysConfsService.upsert(input);
  }

  @Query(() => [SysConfEntity], {
    name: 'findAllSysConfs',
    description: 'Отримати список усіх налаштувань'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  async findAll(): Promise<SysConfEntity[]> {
    return this.sysConfsService.findAll();
  }
}
