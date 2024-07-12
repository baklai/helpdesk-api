import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiTags
} from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Scopes } from 'src/common/decorators/scopes.decorator';
import { ScopesGuard } from 'src/common/guards/scopes.guard';
import { Scope } from 'src/common/enums/scope.enum';

import { Report } from './schemas/report.schema';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@ApiTags('Reports')
@Controller('reports')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard, ScopesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Scopes(Scope.ReportCreate)
  @ApiOperation({
    summary: 'Create new record',
    description: 'Required scopes: [' + [Scope.ReportCreate].join(',') + ']'
  })
  @ApiCreatedResponse({ description: 'Success', type: Report })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBody({ description: 'Request body object', type: CreateReportDto })
  async create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    return await this.reportsService.create(createReportDto);
  }

  @Get()
  @Scopes(Scope.ReportRead)
  @ApiOperation({
    summary: 'Get all records',
    description: 'Required scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: [Report] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(): Promise<Report[]> {
    return await this.reportsService.findAll();
  }

  @Get(':id')
  @Scopes(Scope.ReportRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Report })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async findOneById(@Param('id') id: string): Promise<Report> {
    return await this.reportsService.findOneById(id);
  }

  @Put(':id')
  @Scopes(Scope.ReportUpdate)
  @ApiOperation({
    summary: 'Update record by ID',
    description: 'Required scopes: [' + [Scope.ReportUpdate].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Report })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  @ApiBody({ description: 'Request body object', type: UpdateReportDto })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto
  ): Promise<Report> {
    return await this.reportsService.updateOneById(id, updateReportDto);
  }

  @Delete(':id')
  @Scopes(Scope.ReportDelete)
  @ApiOperation({
    summary: 'Delete record by ID',
    description: 'Required scopes: [' + [Scope.ReportDelete].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Report })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async removeOneById(@Param('id') id: string): Promise<Report> {
    return await this.reportsService.removeOneById(id);
  }

  @Get(':id/report')
  @Scopes(Scope.ReportRead)
  @ApiOperation({
    summary: 'Get record by ID',
    description: 'Required scopes: [' + [Scope.ReportRead].join(',') + ']'
  })
  @ApiOkResponse({ description: 'Success', type: Report })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({ name: 'id', description: 'The ID of the record', type: String })
  async reportOneById(@Param('id') id: string): Promise<Record<string, any>> {
    return await this.reportsService.reportOneById(id);
  }
}
