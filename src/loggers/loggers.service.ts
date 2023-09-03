import { Injectable } from '@nestjs/common';

import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';

@Injectable()
export class LoggersService {
  create(createLoggerDto: CreateLoggerDto) {
    return 'This action adds a new logger';
  }

  findAll() {
    return `This action returns all logger`;
  }

  findOneById(id: number) {
    return `This action returns a #${id} logger`;
  }

  updateOneById(id: number, updateLoggerDto: UpdateLoggerDto) {
    return `This action updates a #${id} logger`;
  }

  removeOneById(id: number) {
    return `This action removes a #${id} logger`;
  }
}
