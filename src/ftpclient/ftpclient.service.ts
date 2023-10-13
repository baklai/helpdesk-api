import * as ftp from 'basic-ftp';
import { FTPResponse, FileInfo } from 'basic-ftp';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Readable } from 'stream';

@Injectable()
export class FtpclientService {
  constructor(private configService: ConfigService) {}

  ftpConfig() {
    return {
      host: this.configService.get('ftpHost'),
      port: this.configService.get('ftpPort'),
      user: this.configService.get('ftpUser'),
      password: this.configService.get('ftpPassword'),
      secure: this.configService.get('ftpSecure')
    };
  }

  async files(path: string): Promise<FileInfo[]> {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
      await client.access(this.ftpConfig());
      if (path) {
        await client.cd(path);
      }
      return await client.list();
    } catch (err) {
      throw new Error(err.message);
    } finally {
      client.close();
    }
  }

  async download(path: string, res: any) {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
      await client.access(this.ftpConfig());

      const writableStream = res;

      await client.downloadTo(writableStream, path, 0);

      return;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to download the file from FTP');
    } finally {
      client.close();
    }
  }

  async upload(path: string, file: any) {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
      await client.access(this.ftpConfig());
      const fileStream = new Readable();
      fileStream._read = () => {};
      fileStream.push(file.buffer);
      fileStream.push(null);
      return await client.uploadFrom(fileStream, `${path}/${file.originalname}`);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    } finally {
      client.close();
    }
  }

  async folder(path: string) {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
      await client.access(this.ftpConfig());
      return await client.ensureDir(path);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      client.close();
    }
  }

  async rename(path: string, newPath: string): Promise<FTPResponse> {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
      await client.access(this.ftpConfig());
      return await client.rename(path, newPath);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      client.close();
    }
  }

  async remove(path: string, type: number) {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
      await client.access(this.ftpConfig());
      if (type === 1) {
        return await client.remove(path);
      } else if (type === 2) {
        return await client.removeDir(path);
      } else {
        throw new Error("Couldn't open the file or directory");
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      client.close();
    }
  }
}
