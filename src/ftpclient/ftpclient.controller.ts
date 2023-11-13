import {
  Get,
  Res,
  Put,
  Post,
  Body,
  Query,
  Delete,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { FtpclientService } from './ftpclient.service';

@ApiTags('FTP Client')
@Controller('ftp')
@ApiExcludeController()
export class FtpclientController {
  constructor(private readonly ftpclientService: FtpclientService) {}

  @Get()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async files(@Query('path') path: string) {
    return await this.ftpclientService.files(path);
  }

  @Get('download')
  async download(
    @Query('path') path: string,
    @Query('filename') filename: string,
    @Res() res: Response
  ) {
    const encodedFilename = encodeURIComponent(filename);

    res.setHeader('Content-Disposition', `attachment; filename=${encodedFilename}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    this.ftpclientService.download(`${path}/${filename}`, res);
  }

  @Post('upload/file')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body('path') path: string, @UploadedFile() file: Express.Multer.File) {
    return await this.ftpclientService.upload(path, file);
  }

  @Post('upload/folder')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async uploadFolder(@Body('path') path: string) {
    return await this.ftpclientService.folder(path);
  }

  @Put()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async rename(@Body('path') path: string, @Body('newPath') newPath: string) {
    return await this.ftpclientService.rename(path, newPath);
  }

  @Delete()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async remove(@Query('path') path: string, @Query('type') type: number) {
    return await this.ftpclientService.remove(path, type);
  }
}
