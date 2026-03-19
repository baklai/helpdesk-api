import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';

import { SysToolsArgs } from './dto/systools.args';
import { SysToolsService } from './systools.service';

@Resolver('Системні засоби')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class SysToolsResolver {
  constructor(private readonly sysToolsService: SysToolsService) {}

  @Query(() => String, {
    name: 'getLinkPing',
    description: "Отримати посилання для перевірки зв'язку (Ping)"
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  linkPing(@Args() args: SysToolsArgs): string {
    return this.sysToolsService.linkPing(args.host);
  }

  @Query(() => String, {
    name: 'getLinkRDP',
    description: 'Отримати посилання для віддаленого робочого столу (RDP)'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  linkRDP(@Args() args: SysToolsArgs): string {
    return this.sysToolsService.linkRDP(args.host);
  }

  @Query(() => String, {
    name: 'getLinkVNC',
    description: 'Отримати посилання для віддаленого керування (VNC)'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  linkVNC(@Args() args: SysToolsArgs): string {
    return this.sysToolsService.linkVNC(args.host);
  }
}
