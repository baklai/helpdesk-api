import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as directoryTree from 'directory-tree';
import * as path from 'path';

import { FileHostingDto } from './dto/filehosting.dto';

@Injectable()
export class FileHostingService {
  constructor(private readonly configService: ConfigService) {}

  findAll(): FileHostingDto {
    const hostingPath = this.configService.get('fileHostingPath');
    if (!hostingPath && !hostingPath?.length) {
      return [];
    }
    const cloudPath = path.normalize(hostingPath);
    const items = directoryTree(
      cloudPath,
      {
        extensions: /\.(md|pdf|png|txt|xls|doc|docx|zip|rar|cab|msu|exe|msi)$/,
        attributes: ['size', 'type', 'extension', 'atime', 'mtime', 'ctime', 'birthtime'],
        normalizePath: true
      },
      (item, PATH, stats) => {
        item.path = PATH.replace(cloudPath.replaceAll('\\', '/'), '/filehosting');
      },
      (item, PATH, stats) => {
        item.path = PATH.replace(cloudPath.replaceAll('\\', '/'), '/filehosting');
      }
    );
    return items?.children || [];
  }
}
