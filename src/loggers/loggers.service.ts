import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggersService {
  findAll() {
    return `This action returns all logger`;
  }

  findOneById(id: string) {
    return `This action returns a #${id} logger`;
  }

  removeOneById(id: string) {
    return `This action removes a #${id} logger`;
  }
}
