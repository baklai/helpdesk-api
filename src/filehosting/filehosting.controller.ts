import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

import { FileHostingService } from './filehosting.service';
import { FileHostingDto } from './dto/filehosting.dto';

@ApiTags('FileHosting')
@Controller('filehosting')
@ApiBearerAuth('JWT Guard')
@UseGuards(AccessTokenGuard)
export class FilehostingController {
  constructor(private readonly fileHostingService: FileHostingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a list of files hosted on the platform' })
  findAll(): FileHostingDto {
    return this.fileHostingService.findAll();
  }
}
