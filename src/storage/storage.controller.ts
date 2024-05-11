import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  UseInterceptors,
  UploadedFiles,
  Controller,
  UseGuards,
  Delete,
  Query,
  Post,
  Body,
  Get,
  Put,
  Res
} from '@nestjs/common';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { StorageService } from './storage.service';

@ApiTags('File Storage')
@Controller('storage')
@ApiExcludeController()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async files(@Query('path') path: string = '/'): Promise<Record<string, any>[]> {
    return await this.storageService.files(path);
  }

  @Get('download')
  async download(
    @Query('path') path: string,
    @Query('filename') filename: string,
    @Res() res: any
  ) {
    const encodedFilename = encodeURIComponent(filename);
    try {
      const fileStream = await this.storageService.download(path, filename);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${encodedFilename}"`);
      fileStream.pipe(res);
    } catch (err) {
      res.status(404).send('File not found');
    }
  }

  @Post('upload/file')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(
    @Body('path') path: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<string[]> {
    return this.storageService.uploadFiles(path, files);
  }

  @Post('upload/folder')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async uploadFolder(@Body('path') path: string): Promise<void> {
    return await this.storageService.uploadFolder(path);
  }

  @Put()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async rename(@Body('path') path: string, @Body('newPath') newPath: string): Promise<void> {
    return await this.storageService.rename(path, newPath);
  }

  @Delete()
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  async remove(@Query('path') path: string) {
    return await this.storageService.remove(path);
  }
}
