import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLogger } from './infrasctructure/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appLogger: AppLogger,
  ) {}

  @Get()
  getHello(): string {
    this.appLogger.log('appLogger.log its ok!');
    this.appLogger.error(
      'appLogger.error its ok!',
      new Error('Testing trace').stack,
    );
    this.appLogger.warn('appLogger.warn its ok!');
    return this.appService.getHello();
  }
}
