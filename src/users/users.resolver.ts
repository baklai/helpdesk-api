import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { PaginateArgs } from 'src/common/dto/paginate.args';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { USER } from 'src/common/scope/user.scope';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity, UserPaginated, UserShortEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('Користувачі')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity, { name: 'createOneUser', description: 'Створити нового користувача' })
  @Role(UserRole.ADMIN)
  @Scope(USER.CREATE)
  async create(@Args('input') input: CreateUserInput): Promise<UserEntity> {
    return this.usersService.create(input);
  }

  @Query(() => UserPaginated, {
    name: 'findAllUsers',
    description: 'Отримати список усіх користувачів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(USER.READ)
  async findAll(@Args() args: PaginateArgs): Promise<UserPaginated> {
    return this.usersService.findAllPaginated(args);
  }

  @Query(() => [UserShortEntity], {
    name: 'findAllUsersActive',
    description: 'Отримати список профілів для сповіщень'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(USER.READ)
  async findAllActive(): Promise<UserShortEntity[]> {
    return this.usersService.findAllActive();
  }

  @Query(() => UserEntity, {
    name: 'findOneUserById',
    description: 'Отримати користувача за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN)
  @Scope(USER.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<UserEntity> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => UserEntity, {
    name: 'updateOneUserById',
    description: 'Оновити дані користувача за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN)
  @Scope(USER.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput
  ): Promise<UserEntity> {
    return this.usersService.updateOneById(id, input);
  }

  @Mutation(() => UserEntity, {
    name: 'removeOneUserById',
    description: 'Видалити користувача за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN)
  @Scope(USER.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<UserEntity> {
    return this.usersService.removeOneById(id);
  }
}
