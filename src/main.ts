/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';
import { ErrorResponseFilter } from './common/filters/error-response.filter';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'auth/google', method: RequestMethod.GET },
      { path: 'auth/google/callback', method: RequestMethod.GET },
    ],
  });

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

  app.useGlobalInterceptors(new SuccessResponseInterceptor()); // Formatta le risposte di successo a livello globale (posso usarlo quì perchè nel costruttore dell'interceptor non ci sono dipendenze da injectare, in quel caso per usarlo a livello globale bisogna dichiararlo nel modulo app.module.ts con {provide: APP_INTERCEPTOR, useClass: SuccessResponseInterceptor})
  app.useGlobalFilters(new ErrorResponseFilter()); // Formatta le risposte di errore a livello globale (posso usarlo quì perchè nel costruttore del filter non ci sono dipendenze da injectare, in quel caso per usarlo a livello globale bisogna dichiararlo nel modulo app.module.ts con {provide: APP_FILTER, useClass: ErrorResponseFilter})

  await app.listen(process.env.PORT ?? 8080);
}

void bootstrap();
