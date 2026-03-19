import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getAboutAPI(): string {
    return 'API Helpdesk v1.0';
  }
}
