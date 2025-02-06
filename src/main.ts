/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Rimuove le proprietà non definite nel DTO
      transform: true, // Trasforma automaticamente i payload in base ai tipi
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS Google OAuth2 API')
    .setDescription(
      'REST API for Google OAuth2 authentication. Includes endpoints for login, token management, and user authentication.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
