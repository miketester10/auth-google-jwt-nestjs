/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Rimuove le proprietà non definite nel DTO
      transform: true, // Trasforma automaticamente i payload in base ai tipi
    }),
  );

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
