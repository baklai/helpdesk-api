import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/scopes.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Scope } from 'src/common/enums/scope.enum';

import { LoggersService } from './loggers.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';

@ApiTags('Loggers')
@Controller('loggers')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, RolesGuard)
export class LoggersController {
  constructor(private readonly loggerService: LoggersService) {}

  @Post()
  @Roles(Scope.LoggerCreate)
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }

  @Get()
  @Roles(Scope.LoggerRead)
  findAll() {
    return this.loggerService.findAll();
  }

  @Get(':id')
  @Roles(Scope.LoggerRead)
  findOneById(@Param('id') id: string) {
    return this.loggerService.findOneById(+id);
  }

  @Patch(':id')
  @Roles(Scope.LoggerUpdate)
  updateOneById(@Param('id') id: string, @Body() updateLoggerDto: UpdateLoggerDto) {
    return this.loggerService.updateOneById(+id, updateLoggerDto);
  }

  @Delete(':id')
  @Roles(Scope.LoggerDelete)
  removeOneById(@Param('id') id: string) {
    return this.loggerService.removeOneById(+id);
  }
}
