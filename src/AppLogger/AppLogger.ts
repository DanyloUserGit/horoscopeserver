import { ConsoleLogger } from '@nestjs/common';

export class AppLogger extends ConsoleLogger {
  log(message: any, stack?: string | '',){
    super.log(message,  stack);
  }
  error(message: any, stack?: string | '', context?: string) {
    super.error(message,  stack);
  }
}