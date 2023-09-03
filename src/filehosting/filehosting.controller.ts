import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FileHostingService } from './filehosting.service';
import { FileHostingDto } from './dto/filehosting.dto';

@ApiTags('FileHosting')
@Controller('filehosting')
export class FilehostingController {
  constructor(private readonly fileHostingService: FileHostingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a list of files hosted on the platform' })
  findAll(): FileHostingDto {
    return this.fileHostingService.findAll();
  }
}
