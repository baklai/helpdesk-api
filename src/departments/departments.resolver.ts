import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { DEPARTMENT } from 'src/common/scope/user.scope';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { DepartmentEntity } from './entities/department.entity';

@Resolver('Відділи')
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => DepartmentEntity, {
    name: 'createOneDepartment',
    description: 'Створити новий відділ'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(DEPARTMENT.CREATE)
  async create(@Args('input') input: CreateDepartmentInput): Promise<DepartmentEntity> {
    return this.departmentsService.create(input);
  }

  @Query(() => [DepartmentEntity], {
    name: 'findAllDepartments',
    description: 'Отримати список усіх відділів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(DEPARTMENT.READ)
  async findAll(): Promise<DepartmentEntity[]> {
    return this.departmentsService.findAll();
  }

  @Query(() => DepartmentEntity, {
    name: 'findOneDepartmentById',
    description: 'Отримати відділ за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT, UserRole.CLIENT)
  @Scope(DEPARTMENT.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<DepartmentEntity> {
    return this.departmentsService.findOneById(id);
  }

  @Mutation(() => DepartmentEntity, {
    name: 'updateOneDepartmentById',
    description: 'Оновити дані відділу за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(DEPARTMENT.UPDATE)
  async updateOneById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput
  ): Promise<DepartmentEntity> {
    return this.departmentsService.updateOneById(id, input);
  }

  @Mutation(() => DepartmentEntity, {
    name: 'removeOneDepartmentById',
    description: 'Видалити відділ за ідентифікатором запису'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT)
  @Scope(DEPARTMENT.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<DepartmentEntity> {
    return this.departmentsService.removeOneById(id);
  }
}
