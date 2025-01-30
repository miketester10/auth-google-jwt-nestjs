/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  ConfigModule.forRoot({
    isGlobal: true, // Rende il modulo di configurazione disponibile globalmente
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
