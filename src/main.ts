import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './AppLogger/AppLogger';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule, {logger: new AppLogger()});
  app.enableCors(
    {
      origin: ['http://localhost:5000',
        'http://localhost:3000', 
        'https://danylousergit.github.io',
      ], 
      credentials: true,
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");

  await app.listen(process.env.APP_PORT || 5000, () =>
    console.log('Server started on port ' + process.env.APP_PORT || 5000),
  );
}
bootstrap();
