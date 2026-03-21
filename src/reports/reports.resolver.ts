import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Types } from 'mongoose';

import { JwtProfile } from 'src/common/decorators/user-jwt.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { Scope } from 'src/common/decorators/user-scope.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserStatusGuard } from 'src/common/guards/user-status.guard';
import { REPORT } from 'src/common/scope/user.scope';
import type { JwtPayload } from 'src/common/types/jwt-payload.type';
import { UserShortEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { ReportEntity } from './entities/report.entity';
import { Report } from './models/report.schema';
import { ReportsService } from './reports.service';

@ObjectType()
class ReportCollectionField {
  @Field(() => String)
  name: string;

  @Field(() => String)
  label: string;

  @Field(() => [String])
  fields: string[];
}

@Resolver(() => ReportEntity)
@UseGuards(AccessTokenGuard, UserStatusGuard, UserRoleGuard)
export class ReportsResolver {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => ReportEntity, { name: 'createOneReport', description: 'Створити новий звіт' })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.CREATE)
  async create(
    @JwtProfile() user: JwtPayload,
    @Args('input') input: CreateReportInput
  ): Promise<ReportEntity> {
    return this.reportsService.create(user, input);
  }

  @Query(() => [ReportEntity], {
    name: 'findAllReports',
    description: 'Отримати список усіх звітів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.READ)
  async findAll(): Promise<ReportEntity[]> {
    return this.reportsService.findAll();
  }

  @Query(() => ReportEntity, {
    name: 'findOneReportById',
    description: 'Отримати звіт за ідентифікатором'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.READ)
  async findOneById(@Args('id', { type: () => ID }) id: string): Promise<ReportEntity> {
    return this.reportsService.findOneById(id);
  }

  @Query(() => [GraphQLJSON], {
    name: 'executeReportById',
    description: 'Виконати звіт за ідентифікатором — повертає масив рядків таблиці'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.READ)
  async executeById(@Args('id', { type: () => ID }) id: string): Promise<Record<string, any>[]> {
    return this.reportsService.executeById(id);
  }

  @Query(() => [ReportCollectionField], {
    name: 'getReportCollections',
    description: 'Отримати список доступних колекцій та їхніх полів для конструктора звітів'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.READ)
  getAvailableCollections(): ReportCollectionField[] {
    return this.reportsService.getAvailableCollections();
  }

  @Mutation(() => ReportEntity, {
    name: 'updateOneReportById',
    description: 'Оновити дані звіту за ідентифікатором'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.UPDATE)
  async updateOneById(
    @JwtProfile() user: JwtPayload,
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateReportInput
  ): Promise<ReportEntity> {
    return this.reportsService.updateOneById(user, id, input);
  }

  @Mutation(() => ReportEntity, {
    name: 'removeOneReportById',
    description: 'Видалити звіт за ідентифікатором'
  })
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @Scope(REPORT.DELETE)
  async removeOneById(@Args('id', { type: () => ID }) id: string): Promise<ReportEntity> {
    return this.reportsService.removeOneById(id);
  }

  @ResolveField(() => UserShortEntity, { nullable: true })
  async creator(@Parent() report: Report) {
    const userId = report?.creator || null;
    if (!userId || !Types.ObjectId.isValid(userId.toString())) return null;
    return this.usersService.load(userId.toString());
  }
}
